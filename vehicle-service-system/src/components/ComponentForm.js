import React, { useState } from 'react';
import axios from 'axios';
import csrftoken from '../csrf';

const ComponentForm = () => {
    const [name, setName] = useState('');
    const [repairPrice, setRepairPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/components/',
                {
                    name,
                    repair_price: repairPrice,
                    purchase_price: purchasePrice
                },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );
            // Reset form fields
            setName('');
            setRepairPrice('');
            setPurchasePrice('');
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Component</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Repair Price:</label>
                <input type="number" step="0.01" value={repairPrice} onChange={(e) => setRepairPrice(e.target.value)} required />
            </div>
            <div>
                <label>Purchase Price:</label>
                <input type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ComponentForm;
