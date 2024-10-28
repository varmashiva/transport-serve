import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [adminMessage, setAdminMessage] = useState('');

    // Function to fetch all pending requests
    const fetchRequests = async () => {
        try {
            const response = await axios.get('https://transport-serve.onrender.com/admin-requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApproveRequest = async (id) => {
        try {
            await axios.post(`https://transport-serve.onrender.com/approve-request/${id}`);
            fetchRequests(); // Refresh requests after approval
        } catch (error) {
            console.error('Error approving request', error);
        }
    };

    const handleRejectRequest = async (id) => {
        try {
            await axios.post(`https://transport-serve.onrender.com/reject-request/${id}`);
            fetchRequests(); // Refresh requests after rejection
        } catch (error) {
            console.error('Error rejecting request', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Pending Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request._id}>
                        {request.busNumber}: {request.description} (Status: {request.status})
                        <button onClick={() => handleApproveRequest(request._id)}>Approve</button>
                        <button onClick={() => handleRejectRequest(request._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;