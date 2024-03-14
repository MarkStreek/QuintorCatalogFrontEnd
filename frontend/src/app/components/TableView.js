// frontend/src/app/components/TableView.js
import React, { useState, useEffect } from 'react';
import { Pagination, Skeleton } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button } from "@nextui-org/react";

const DummyDataTable = () => {
    const [allData, setAllData] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [Page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const rowsPerPage = 2;

    const fetchDummyData = async () => {
        setIsLoading(true);
        setError(null);


        try {
            const response = await fetch('/api/fetchdummydata');
            if (response.ok) {
                const data = await response.json();
                setAllData(data || []);
            } else {
                throw new Error('Data could not be fetched.');
            }
        } catch (error) {
            setError(error.message);

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
            <TableBody emptyContent={"No rows to display"}>
                {isLoading ? (
                    Array.from({ length: rowsPerPage }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className='w-2/5 rounded-lg' data-testid="skeleton">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='w-4/5 rounded-lg'>
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </TableCell>
                            <TableCell>
                                <Skeleton className='w-4/5 rounded-lg'>
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    dummyData.map((dummy, index) => (
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
