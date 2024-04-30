import React, { useState, useEffect } from 'react';
import {TableHeader, TableBody, TableColumn, Button, Pagination, Table, TableRow, TableCell, SortDescriptor} from "@nextui-org/react";
import renderSkeleton from "@/app/components/Table/RenderSkeleton";
import Link from "next/link";
import {useAsyncList} from "@react-stately/data";

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


    async function sort(items, sortDescriptor) {
        console.log(items, sortDescriptor);
    }

    return (
        <div>
            <Table
                aria-label="Dummy Data Table"
                color={"primary"}
                selectionMode={"multiple"}
                onSortChange={sort}
                sortDescriptor={sort}
                bottomContent = {
                    <div className="">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={currentPageNumber}
                            total={amountOfPages}
                            onChange={(page) => props.setPage(page)}
                        />
                    </div>}
                classNames={{wrapper: "min-h-[222px]"}}
            >
                <TableHeader>
                    <TableColumn allowsSorting key="type">Type</TableColumn>
                    <TableColumn allowsSorting key="brandName">Merk naam</TableColumn>
                    <TableColumn allowsSorting key="model">Model</TableColumn>
                    <TableColumn allowsSorting key="serialNumber">Serienummer</TableColumn>
                    <TableColumn allowsSorting key="invoiceNumber">Factuurnummer</TableColumn>
                    <TableColumn allowsSorting key="locationName">Locatie naam</TableColumn>
                    <TableColumn allowsSorting key="locationCity">Locatie Stad</TableColumn>
                    <TableColumn>Specifications</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Geen rijen om weer te geven"}>
                    {loading ? renderSkeleton(rowsPerPage) : dummyData.map((dummy, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <TableRow>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.type}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.brandName}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.model}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.serialNumber}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.invoiceNumber}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.locationName}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{dummy.locationCity}</TableCell>
                            {/* Gebruik aangepaste stijlen voor de laatste cel */}
                            <TableCell>
                                {dummy.specs && dummy.specs.length > 0 ? (
                                    dummy.specs.map((spec, index) => (
                                        // Gebruik een <div> in plaats van <p> voor betere uitlijning
                                        <div key={index}>{spec.specName} : {spec.value}</div>
                                    ))
                                ) : (<div>Niet beschikbaar</div>)}
                                <hr className="w-full h-0.5 mx-auto m-2 bg-gray-300 border-0 rounded dark:bg-gray-700"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br/>
            <Link href="/addDevice">
            <Button color="primary">
                Apparaat toevoegen
            </Button>
            </Link>
        </div>
    );
};