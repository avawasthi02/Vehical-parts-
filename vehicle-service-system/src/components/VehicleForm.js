import React, { useState } from 'react';
import axios from 'axios';
import csrftoken from '../csrf';

const VehicleForm = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/vehicles/',
                {
                    make,
                    model,
                    year
                },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );

            setMake('');
            setModel('');
            setYear('');
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Vehicle</h2>
            <div>
                <label>Make:</label>
                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
            </div>
            <div>
                <label>Model:</label>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
            </div>
            <div>
                <label>Year:</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default VehicleForm;
