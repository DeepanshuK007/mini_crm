// backend/models/CommunicationLog.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	campaignId: mongoose.Schema.Types.ObjectId,
	customerId: mongoose.Schema.Types.ObjectId,
	message: String,
	status: String,
	createdAt: Date
});

module.exports = mongoose.model('CommunicationLog', logSchema);
