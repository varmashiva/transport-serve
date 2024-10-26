import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DriverDashboard.css';

const DriverDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [busNumber, setBusNumber] = useState('');
    const [issue, setIssue] = useState('');

    // Function to fetch repair requests
    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/driver-requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/request-repair', {
                busNumber,
                description: issue,
            });
            console.log('Request submitted', response.data);
            fetchRequests(); // Refresh requests after submission
            setBusNumber(''); // Clear input fields
            setIssue('');
        } catch (error) {
            console.error('Error submitting request', error);
        }
    };

    const handleApproveRequest = async (requestId) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/approve-request/${requestId}`);
            console.log('Request approved', response.data);
            fetchRequests(); // Refresh requests after approval
        } catch (error) {
            console.error('Error approving request', error);
        }
    };

    return (
        <div>
            <h1>Driver Dashboard</h1>
            <form onSubmit={handleSubmitRequest}>
                <input
                    type="text"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    placeholder="Bus Number"
                    required
                />
                <textarea
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Describe the issue"
                    required
                />
                <button type="submit">Submit Request</button>
            </form>

            <h2>Pending Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request._id} className="request-item">
                        {request.busNumber}: {request.description} (Status: {request.status})
                        <button className="approve-button" onClick={() => handleApproveRequest(request._id)}>
                            Approve
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverDashboard;