import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
    TableHeader,
    TableBody,
    TableColumn,
    Pagination,
    Table,
    TableRow,
    TableCell,
    Input, Button
} from "@nextui-org/react";

import Link from "next/link";
import {FaSearch} from "react-icons/fa";
import {useRouter} from "next/router";

/**
 * Function that creates the dummy data table and returns it.
 */
export default function DevicesTableComponent({data, loading}) {

    /*
    The state variables for the filter value and the search filter.
    Also, the router is used to get the search query from the URL.
     */
    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);
    const router = useRouter();

    /**
     * This useMemo is the main function that handles the input of the search field.
     * If the user types in the search field, the filterValue state is updated with the given value.
     * And because the filterValue changes, this function is called and returns the filtered items.
     *
     * @returns {Array} the filtered items
     */
    const filteredItems = useMemo(() => {
        let filteredDevices = [...data];
        if (hasSearchFilter) {
            filteredDevices = filteredDevices.filter(device =>
                device.type.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.brandName.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.model.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.serialNumber.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.invoiceNumber.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.locationName.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.locationCity.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredDevices;
    }, [data, filterValue, hasSearchFilter]);

    /*
    The state variables for the rows per page and the current page number.
     */
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    /**
     * This useCallback hook is used to handle the rows per page change event.
     * The user can select the amount of rows per page in the select field.
     * After selecting a new value, this function is called and updates the rows per page state.
     * The page number is also reset to 1 when the rows per page change.
     */
    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);


    /**
     * A useMemo hook to slice the items based on the current page and rows per page.
     * If the page, rowsPerPage or filteredItems change, the items are sliced based on the new values.
     * This memo is used in the TableBody component to render the right items on the right page.
     */
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, rowsPerPage, filteredItems]);


    /**
     * The sortDescriptor state variable.
     * It contains the column to sort on and the direction of the sort.
     */
    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'name',
        direction: 'ascending'
    });

    /**
     * This useMemo hook is used to sort the items based on the sort descriptor.
     * The sort descriptor contains the column to sort on and the direction of the sort.
     * If the sortDescriptor or items changes, the items are sorted using this hook.
     * Items is a variable that contains the filtered items and the right slice of
     * items (5, 10 or 15 per tablepage).
     */
    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    /**
     * This useCallback hook is used to handle the search change event.
     * When a user is typing in the search input, this function is called.
     * It updates the search filter value with the given value. If the value is empty,
     * the filter value is set to an empty string.
     *
     * @param value the search value
     */
    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    /**
     * This useEffect hook is called when the search query in the URL changes.
     * If a user searches for a device in the homepage, the search query is added to the URL.
     * Then, this effect comes in action and updates the search filter value with the given query.
     * This way, the search filter value is updated when the user searches for a device.
     */
    useEffect(() => {
        const searchQuery = router.query.search;
        if (searchQuery) {
            setFilterValue(searchQuery.toString());
        }

    }, [router.query.search]);

    /**
     * Simple useCallback hook that is used to clear the search filter value and
     * reset the page number to 1.
     * This function is called when the user clicks on the clear button.
     */
    const onClear = useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    /**
     * This useMemo hook is used to create the top content of the table.
     * The memo hook is used to store the content in memory and only update it when:
     *      - The filter value changes
     *      - The onSearchChange function changes
     *      - The onClear function changes
     *      - The onRowsPerPageChange function changes
     * The topContent is rendered at the top of the table and
     * contains the search input field and rows per page select.
     *
     * The topContent is returned and used in the Table component (see return() below).
     */
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
                        Aantal rijen per pagina:&nbsp;
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [filterValue, onSearchChange, onRowsPerPageChange, onClear]);

    return (
        <div>
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
            <TableBody items={sortedItems} emptyContent={'Er zijn geen apparaten gevonden'}>
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
        <Link href="/addDevice">
            <Button color="primary">
                Apparaat toevoegen
            </Button>
        </Link>
    </div>
    );
}