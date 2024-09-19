import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [busNumber, setBusNumber] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    // Fetch driver’s submitted requests (assumed API endpoint for requests)
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/driver-requests');
        setRequests(response.data); // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching requests', error);
        setRequests([]); // Set to empty array if there's an error
      }
    };

    fetchRequests();
  }, []);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/request-repair', {
        busNumber,
        description,
      });
      alert('Repair request submitted');
      setBusNumber('');
      setDescription('');
    } catch (error) {
      alert('Error submitting request');
    }
  };

  const handleFeedbackUpload = async (requestId) => {
    const formData = new FormData();
    formData.append('feedback', feedback);
    formData.append('receipt', receipt);

    try {
      await axios.post(`/api/upload-feedback/${requestId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Feedback and receipt uploaded');
      setFeedback('');
      setReceipt(null);
    } catch (error) {
      alert('Error uploading feedback');
    }
  };

  return (
    <div className="driver-dashboard">
      <h1>Driver Dashboard</h1>

      <section className="request-section">
        <h2>Submit a Repair Request</h2>
        <form onSubmit={handleSubmitRequest}>
          <label>
            Bus Number:
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Description of Issue:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Request</button>
        </form>
      </section>

      <section className="request-status-section">
        <h2>Your Repair Requests</h2>
        {Array.isArray(requests) && requests.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Description</th>
                <th>Status</th>
                <th>Feedback & Receipt</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.busNumber}</td>
                  <td>{request.description}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === 'Approved' ? (
                      <div className="feedback-section">
                        <input
                          type="text"
                          placeholder="Feedback"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                        <input
                          type="file"
                          onChange={(e) => setReceipt(e.target.files[0])}
                        />
                        <button
                          onClick={() => handleFeedbackUpload(request._id)}
                        >
                          Upload
                        </button>
                      </div>
                    ) : (
                      <p>Waiting for approval</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No requests found.</p>
        )}
      </section>
    </div>
  );
};

export default DriverDashboard;
