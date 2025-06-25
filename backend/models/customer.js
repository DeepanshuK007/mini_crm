// backend/models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	name: String,
	email: String,
	totalSpend: Number,
	visitCount: Number,
	lastActive: Date
});

module.exports = mongoose.model('Customer', customerSchema);
