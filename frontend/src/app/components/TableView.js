import React, { useState, useEffect } from 'react';
  
const DummyDataTable = () => {
    const [dummyData, setDummyData] = useState([]);
    useEffect(() => {
        const fetchDummyData = async () => {
            const response = await fetch('/api/fetchdummydata', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setDummyData(data);
            } else {
                console.error('Error fetching dummy data', response);
            }
        };
        fetchDummyData();
    }, []);

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