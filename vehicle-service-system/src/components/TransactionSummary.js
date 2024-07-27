import React, { useState, useEffect } from 'react';
import axios from 'axios';
import csrftoken from '../csrf';

const TransactionSummary = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [issueId, setIssueId] = useState('');
    const [finalPrice, setFinalPrice] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [issues, setIssues] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const vehiclesResponse = await axios.get('/api/vehicles/');
                const issuesResponse = await axios.get('/api/issues/');
                setVehicles(vehiclesResponse.data);
                setIssues(issuesResponse.data);
            } catch (error) {
                console.error("There was an error fetching vehicles and issues!", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/transactions/',
                {
                    vehicle: vehicleId,
                    issue: issueId,
                    final_price: finalPrice
                },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                }
            );
            /
            setVehicleId('');
            setIssueId('');
            setFinalPrice('');
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Transaction</h2>
            <div>
                <label>Vehicle:</label>
                <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} required>
                    <option value="">Select Vehicle</option>
                    {vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Issue:</label>
                <select value={issueId} onChange={(e) => setIssueId(e.target.value)} required>
                    <option value="">Select Issue</option>
                    {issues.map(issue => (
                        <option key={issue.id} value={issue.id}>
                            {issue.description}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Final Price:</label>
                <input type="number" step="0.01" value={finalPrice} onChange={(e) => setFinalPrice(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransactionSummary;
