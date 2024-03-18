// frontend/src/app/components/TableView.js
import React, { useState, useEffect } from 'react';
import { Pagination, Skeleton } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button } from "@nextui-org/react";

const DummyDataTable = () => {
    const [allData, setAllData] = useState([]);
    const [dummyData, setDummyData] = useState([]);
    const [Page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const rowsPerPage = 2;

    const fetchDummyData = async () => {
        setIsLoading(true);

        /*
        Fetch the data from the API endpoint,
        The fetch request is made to the /api/fetchdummydata endpoint.
        From this endpoint, a GET request is made to the Back end server to fetch the dummy data.

        The response from the fetch request is then checked to see if it is ok 
        and the data is extracted from the response.
        Error are logged to the console if any occur during the fetch request.
        */
        try {
            let response = await fetch('/api/fetchdummydata');
            if (response.ok) {
                let data = await response.json();
                // Update the hook with the fetched data
                setAllData(data || []);
            } else {
                console.error('Response from the fetch request was NOT ok');
            }
        } catch (error) {
            console.error('Error fetching dummy data', error);
        }
        // Change the loading Hook to false
        setIsLoading(false);
    };

    let pages = Math.ceil(allData.length / rowsPerPage);
    // Hook that's called when the data changes
    // The hook is used to calculate the start and end index of the data to be displayed
    useEffect(() => {
        let start = (Page - 1) * rowsPerPage;
        let end = start + rowsPerPage;
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
