const express = require('express');
const router = express.Router();
const RepairRequest = require('../models/RepairRequest'); // Ensure this path is correct

// Get all repair requests for the driver
router.get('/driver-requests', async (req, res) => {
    console.log("Fetching driver requests..."); // Log to check if the route is hit
    try {
        const requests = await RepairRequest.find();
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error); // Log errors
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// Get all pending requests for admin
router.get('/admin-requests', async (req, res) => {
    try {
        const requests = await RepairRequest.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// Approve a request
router.post('/approve-request/:id', async (req, res) => {
    try {
        await RepairRequest.findByIdAndUpdate(req.params.id, {
            status: 'Approved',
            adminMessage: 'Your repair request has been approved.',
        });
        res.json({ message: 'Request approved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve request' });
    }
});

// Reject a request
router.post('/reject-request/:id', async (req, res) => {
    try {
        await RepairRequest.findByIdAndUpdate(req.params.id, {
            status: 'Rejected',
            adminMessage: 'Your repair request has been rejected.',
        });
        res.json({ message: 'Request rejected' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject request' });
    }
});

// Submit a new repair request
router.post('/request-repair', async (req, res) => {
    try {
        const { busNumber, description } = req.body;
        const newRequest = new RepairRequest({ busNumber, description, status: 'Pending' });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit repair request' });
    }
});

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

module.exports = router;