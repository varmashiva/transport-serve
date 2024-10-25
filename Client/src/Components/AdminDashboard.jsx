import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all pending requests from the server
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/admin-requests');
        setRequests(response.data); // Ensure response.data is an array of requests
      } catch (error) {
        console.error('Error fetching requests', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.post(`/api/approve-request/${requestId}`);
      alert('Request approved');
      // Update the requests list
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      alert('Error approving request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`/api/reject-request/${requestId}`);
      alert('Request rejected');
      // Update the requests list
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      alert('Error rejecting request');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Manage and approve or reject bus service requests.</p>
      
      {requests.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.busNumber}</td>
                <td>{request.description}</td>
                <td>
                  <button onClick={() => handleApprove(request._id)}>Approve</button>
                  <button onClick={() => handleReject(request._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
