import React, { useState, useEffect } from 'react';
import axios from 'axios';
import csrftoken from '../csrf';

const IssueForm = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [description, setDescription] = useState('');
    const [componentId, setComponentId] = useState('');
    const [repairNeeded, setRepairNeeded] = useState(false);
    const [repairPrice, setRepairPrice] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [components, setComponents] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const vehiclesResponse = await axios.get('/api/vehicles/');
                const componentsResponse = await axios.get('/api/components/');
                setVehicles(vehiclesResponse.data);
                setComponents(componentsResponse.data);
            } catch (error) {
                console.error("There was an error fetching vehicles and components!", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/issues/',
                {
                    vehicle: vehicleId,
                    description,
                    component: componentId || null,
                    repair_needed: repairNeeded,
                    repair_price: repairPrice || null
                },
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            );
            // Reset form fields
            setVehicleId('');
            setDescription('');
            setComponentId('');
            setRepairNeeded(false);
            setRepairPrice('');
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Issue</h2>
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
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Component (Optional):</label>
                <select value={componentId} onChange={(e) => setComponentId(e.target.value)}>
                    <option value="">Select Component</option>
                    {components.map(component => (
                        <option key={component.id} value={component.id}>
                            {component.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Repair Needed:</label>
                <input type="checkbox" checked={repairNeeded} onChange={(e) => setRepairNeeded(e.target.checked)} />
            </div>
            <div>
                <label>Repair Price (if repair needed):</label>
                <input type="number" step="0.01" value={repairPrice} onChange={(e) => setRepairPrice(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default IssueForm;
