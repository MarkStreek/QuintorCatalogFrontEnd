import React, { useState, useEffect } from 'react';
import { TableHeader, TableBody, TableColumn} from "@nextui-org/react";
import TableComponent from './CreateTable.js';
import renderSkeleton from "@/app/components/RenderSkeleton";
import renderData from "@/app/components/RenderData";
import FormComponent from './FormComponent.js';

/**
 * Function that creates the dummy data table and returns it.
 * The TableComponent function from the CreateTable.js file is used to create the table component.
 * In this function, the table header and body are created.
 * The function takes in the data that was fetched from the API and a loading state as arguments.
 *
 * @param data the data fetched from the API
 * @param loading the loading state
 * @returns {Element} the dummy data table
 */
export default function DummyDataTable({data, loading}) {
    // state variables to store the dummy data and the current page number
    const [dummyData, setDummyData] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    // calculate the total amount of pages
    const rowsPerPage = 10;
    let amountOfPages = Math.ceil(data.length / rowsPerPage);

    /*
    useEffect hook that runs when the currentPageNumber or data changes.
    1. The hook calculates the start and end index of the data to display.
    2. With the calculated start and end, the right amount of data is sliced from the data array.
     */
    useEffect(() => {
        let start = (currentPageNumber - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        setDummyData(data.slice(start, end));
    }, [currentPageNumber, data]);

    /*
    Using the TableComponent function from the CreateTable.js file to create the table component.
    The renderSkeleton function from the RenderSkeleton.js file is used to render the table body,
    based on the loading:
        - If the loading is true, the function returns a skeleton data.
        - If the loading is false, the function returns the actual data.
     */
    return (
        <div>
            <TableComponent
                currentPage={currentPageNumber}
                setPage={setCurrentPageNumber}
                amountOfPages={amountOfPages}>
                <TableHeader>
                    <TableColumn>Id</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Brand name</TableColumn>
                    <TableColumn>Model</TableColumn>
                    <TableColumn>Serial number</TableColumn>
                    <TableColumn>Invoice number</TableColumn>
                    <TableColumn>Location name</TableColumn>
                    <TableColumn>Specifications</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display"}>
                    {loading ? renderSkeleton(rowsPerPage) : renderData(dummyData)}
                </TableBody>
            </TableComponent>
            <br/>
            <FormComponent />
        </div>
    );
};