// backend/routes/campaigns.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');

router.post('/preview', async (req, res) => {
	const { rules, operator } = req.body;
	const query = rules.map(({ field, operator, value }) => {
		const parsedValue =
			field === 'lastActive' ? new Date(Date.now() - 1000 * 60 * 60 * 24 * Number(value)) : Number(value);
		return { [field]: { [`$${operator}`]: parsedValue } };
	});

	const mongoQuery = operator === 'AND' ? { $and: query } : { $or: query };

	const count = await Customer.countDocuments(mongoQuery);
	res.json({ size: count });
});

// Helper to simulate message delivery
function simulateDelivery(customer, message) {
	const success = Math.random() < 0.9; // ~90% success rate
	return {
		status: success ? 'SENT' : 'FAILED',
		message,
		customerId: customer._id,
		name: customer.name
	};
}

router.post('/create', async (req, res) => {
	const { campaignName, rules, operator, message } = req.body;

	// Save campaign
	const newCampaign = new Campaign({
		name: campaignName,
		rules,
		operator,
		message,
		createdAt: new Date()
	});
	await newCampaign.save();

	// Build MongoDB query
	const conditions = rules.map(({ field, operator, value }) => ({
		[field]: { [`$${operator}`]: Number(value) }
	}));
	const query = operator === 'AND' ? { $and: conditions } : { $or: conditions };

	const matchedCustomers = await Customer.find(query);

	// Simulate message delivery
	const logs = matchedCustomers.map((customer) => simulateDelivery(customer, `Hi ${customer.name}, ${message}`));

	// Save delivery logs
	await CommunicationLog.insertMany(
		logs.map((log) => ({
			campaignId: newCampaign._id,
			customerId: log.customerId,
			status: log.status,
			message: log.message,
			createdAt: new Date()
		}))
	);

	res.json({ success: true, audienceSize: matchedCustomers.length });
});

module.exports = router;
