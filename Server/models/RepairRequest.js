const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema({
    busNumber: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    adminMessage: { type: String, default: '' },
}, { timestamps: true });

const RepairRequest = mongoose.model('RepairRequest', repairRequestSchema);

module.exports = RepairRequest;