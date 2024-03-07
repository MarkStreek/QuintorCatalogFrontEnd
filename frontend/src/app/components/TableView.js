// app/components/TableView.js
// This component renders a table view of dummy data fetched from an API endpoint.

import React, { useState, useEffect } from 'react';
  
/**
 * Renders a table component that displays dummy data fetched from an API.
 *
 * @component
 * @returns {JSX.Element} The rendered DummyDataTable component.
 */
const DummyDataTable = () => {
    // State variable to store the dummy data.
    const [dummyData, setDummyData] = useState([]);

    // Fetch the dummy data from the API endpoint when the component mounts.
    useEffect(() => {
        // Function to fetch dummy data from the api.
        const fetchDummyData = async () => {
            const response = await fetch('/api/fetchdummydata', {
                method: 'GET',
            });

            // Check if the fetch request was successful.
            if (response.ok) {
                // Parse the JSON response and update the state with the fetched data.
                const data = await response.json();
                setDummyData(data);
            } else {
                // Log an error message if the fetch request fails.
                console.error('Error fetching dummy data', response);
            }
        };

        // Call the fetchDummyData function to fetch the dummy data.
        fetchDummyData();
    }, []); // Empty useState array so this effect runs once on mount.

    // Render the table with the fetched dummy data.
    return (
        <div>
            <h1>Dummy Data Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the dummyData array to render each row. */}
                    {dummyData.map((dummy, index) => (
                        <tr key={index}>
                            <td>{dummy.id}</td>
                            <td>{dummy.name}</td>
                            <td>{dummy.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DummyDataTable;