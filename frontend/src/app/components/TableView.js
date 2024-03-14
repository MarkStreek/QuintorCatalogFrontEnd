import React, { useState, useEffect } from 'react';
import {Pagination} from "@nextui-org/react";

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/react";

const DummyDataTable = () => {
    const [allData, setAllData] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [Page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State om fouten bij te houden
    const rowsPerPage = 2;

    const fetchDummyData = async () => {
        setIsLoading(true);
        setError(null); // Reset error status bij elke nieuwe fetch
        try {
            const response = await fetch('/api/fetchdummydata');
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

    const pages = Math.ceil(allData.length / rowsPerPage);
    
    useEffect(() => {
        const start = (Page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        setDummyData(allData.slice(start, end));
    }, [Page, allData]);

    useEffect(() => {
        fetchDummyData();
    }, []);

    
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <Table aria-label="Dummy Data Table"
        bottomContent={
            <div className="">
                <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={Page}
                total={pages}
                onChange={(page) => setPage(page)}
                />
            </div>
        }
        classNames={{
            wrapper: "min-h-[222px]",
        }}
        >
            <TableHeader>
                <TableColumn>Id</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Value</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display"} loadingContent={"Loading..."}>
                {(dummyData.map((dummy, index) => (
                    <TableRow key={index}>
                        <TableCell>{dummy.id}</TableCell>
                        <TableCell>{dummy.name}</TableCell>
                        <TableCell>{dummy.value}</TableCell>
                    </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
        
    );
};

export default DummyDataTable;
