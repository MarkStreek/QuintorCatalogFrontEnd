import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const DummyDataTable = () => {
    const [allData, setAllData] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;  // Set your desired number of items per page

    const fetchDummyData = async () => {
        try {
          const response = await fetch('/api/fetchdummydata');
          if (response.ok) {
            const data = await response.json();
            setAllData(data || []); // Store all fetched data
          } else {
            console.error('Error fetching dummy data: ', response.statusText);
            setAllData([]);
          }
        } catch (error) {
          console.error('Error fetching dummy data: ', error);
          setAllData([]);
        }
    };
    
    useEffect(() => {
        fetchDummyData();
    }, []); // Fetch data only once when the component mounts

    useEffect(() => {
        // Calculate the slice of data to display based on currentPage and itemsPerPage
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setDummyData(allData.slice(start, end));
    }, [currentPage, allData]); // Recalculate displayed data when currentPage or allData changes

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

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
            <Pagination
                total={allData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default DummyDataTable;
