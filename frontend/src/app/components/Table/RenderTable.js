import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
    TableHeader,
    TableBody,
    TableColumn,
    Pagination,
    Table,
    TableRow,
    TableCell,
    SortDescriptor,
    Input
} from "@nextui-org/react";

import renderSkeleton from "@/app/components/Table/RenderSkeleton";
import Link from "next/link";
import {useAsyncList} from "@react-stately/data";
import {FaSearch} from "react-icons/fa";

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

    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredDevices = [...data];

        if (hasSearchFilter) {
            filteredDevices = filteredDevices.filter(user =>
                user.model.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredDevices;
    }, [data, filterValue, hasSearchFilter]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, rowsPerPage, filteredItems]);

    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'name',
        direction: 'ascending'
    });

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex items-end justify-between gap-3'>
                    <Input
                        isClearable
                        className='w-full sm:max-w-[44%]'
                        placeholder='Zoek op modelnaam...'
                        startContent={<FaSearch/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="3">3</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, onSearchChange, onClear]);

    return (
        <Table
            aria-label='Apparaten Tabel'
            topContent={topContent}
            color={"primary"}
            selectionMode={"multiple"}
            topContentPlacement='outside'
            bottomContent={
                <div className='flex w-full justify-center'>
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color='secondary'
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            bottomContentPlacement='outside'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            classNames={{
                wrapper: 'min-h-[222px]'
            }}
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
            <TableBody items={sortedItems} emptyContent={'No users to display.'}>
                {sortedItems.map(item => (
                    <TableRow key={item.id}>
                        <TableCell className="align-top whitespace-pre-wrap">{item.type}</TableCell>
                        <TableCell className="align-top whitespace-pre-wrap">{item.brandName}</TableCell>
                        <TableCell className="align-top whitespace-pre-wrap">{item.model}</TableCell>
                        <TableCell className="align-top whitespace-pre-wrap">{item.serialNumber}</TableCell>
                        <TableCell className="align-top whitespace-pre-wrap">{item.invoiceNumber}</TableCell>
                        <TableCell className="align-top whitespace-pre-wrap">{item.locationName}</TableCell>
                        <TableCell className="align-top whitespace-pre-wrap">{item.locationCity}</TableCell>
                        <TableCell >
                            {item.specs && item.specs.length > 0 ? (item.specs.map((spec, index) => (
                                         <div key={index}>{spec.specName} : {spec.value}</div>
                                     ))
                                 ) : (<div>Niet beschikbaar</div>)}
                                 <hr className="w-full h-0.5 mx-auto m-2 bg-gray-300 border-0 rounded dark:bg-gray-700"/>
                             </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}




//     return (
//         <div>
//             <Table
//                 aria-label="Dummy Data Table"
//                 color={"primary"}
//                 selectionMode={"multiple"}
//                 onSortChange={sort}
//                 sortDescriptor={sort}
//                 bottomContent = {
//                     <div className="">
//                         <Pagination
//                             isCompact
//                             showControls
//                             showShadow
//                             color="secondary"
//                             page={currentPageNumber}
//                             total={amountOfPages}
//                             onChange={(page) => props.setPage(page)}
//                         />
//                     </div>}
//                 classNames={{wrapper: "min-h-[222px]"}}
//             >
//                 <TableHeader>
//                     <TableColumn allowsSorting key="type">Type</TableColumn>
//                     <TableColumn allowsSorting key="brandName">Merk naam</TableColumn>
//                     <TableColumn allowsSorting key="model">Model</TableColumn>
//                     <TableColumn allowsSorting key="serialNumber">Serienummer</TableColumn>
//                     <TableColumn allowsSorting key="invoiceNumber">Factuurnummer</TableColumn>
//                     <TableColumn allowsSorting key="locationName">Locatie naam</TableColumn>
//                     <TableColumn allowsSorting key="locationCity">Locatie Stad</TableColumn>
//                     <TableColumn>Specifications</TableColumn>
//                 </TableHeader>
//                 <TableBody emptyContent={"Geen rijen om weer te geven"}>
//                     {loading ? renderSkeleton(rowsPerPage) : dummyData.map((dummy, index) => (
//                         // eslint-disable-next-line react/jsx-key
//                         <TableRow>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.type}</TableCell>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.brandName}</TableCell>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.model}</TableCell>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.serialNumber}</TableCell>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.invoiceNumber}</TableCell>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.locationName}</TableCell>
//                             <TableCell className="align-top whitespace-pre-wrap">{dummy.locationCity}</TableCell>
//                             {/* Gebruik aangepaste stijlen voor de laatste cel */}
//                             <TableCell>
//                                 {dummy.specs && dummy.specs.length > 0 ? (
//                                     dummy.specs.map((spec, index) => (
//                                         // Gebruik een <div> in plaats van <p> voor betere uitlijning
//                                         <div key={index}>{spec.specName} : {spec.value}</div>
//                                     ))
//                                 ) : (<div>Niet beschikbaar</div>)}
//                                 <hr className="w-full h-0.5 mx-auto m-2 bg-gray-300 border-0 rounded dark:bg-gray-700"/>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <br/>
//             <Link href="/addDevice">
//             <Button color="primary">
//                 Apparaat toevoegen
//             </Button>
//             </Link>
//         </div>
//     );
// };