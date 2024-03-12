import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const DummyDataTable = () => {
    const [allData, setAllData] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State om fouten bij te houden
    const itemsPerPage = 2;

    const fetchDummyData = async () => {
        setIsLoading(true);
        setError(null); // Reset error status bij elke nieuwe fetch
        try {
            const response = await fetch('/api/wrongendpoint');
            if (response.ok) {
                const data = await response.json();
                setAllData(data || []);
            } else {
                throw new Error('Data could not be fetched.'); // Gooi een fout als response niet ok is
            }
        } catch (error) {
            setError(error.message);
            setAllData([]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDummyData();
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setDummyData(allData.slice(start, end));
    }, [currentPage, allData]);

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
                    {isLoading ? (
                        <tr><td colSpan="3">Loading...</td></tr>
                    ) : error ? (
                        <tr><td colSpan="3">Error: {error}</td></tr>
                    ) : (
                        dummyData.map((dummy, index) => (
                            <tr key={index}>
                                <td>{dummy.id}</td>
                                <td>{dummy.name}</td>
                                <td>{dummy.value}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {!isLoading && !error && (
                <Pagination
                    total={allData.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default DummyDataTable;
