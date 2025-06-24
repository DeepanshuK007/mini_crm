// backend/models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
	name: String,
	rules: Array,
	operator: String,
	message: String,
	createdAt: Date
});

module.exports = mongoose.model('Campaign', campaignSchema);
