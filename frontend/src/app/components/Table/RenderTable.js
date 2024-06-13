import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Button,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";

import Link from "next/link";
import {FaRegEdit, FaSearch} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {useRouter} from "next/router";
import DeviceModal from './DeviceModal'; // Import the DeviceModal component

/**
 * DevicesTableComponent is a component that renders a table displaying a list of devices
 * with sorting, filtering, and pagination capabilities. It also includes a modal for viewing
 * and editing device details.
 * 
 * @param {Array} data - The array of device data to display.
 * @param {boolean} loading - A boolean indicating whether the data is currently loading.
 * @returns {JSX.Element} The DevicesTableComponent.
 */
export default function DevicesTableComponent({ data, loading }) {
    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);
    const router = useRouter();

    /**
     * Filters the devices based on the search filter value.
     * 
     * @returns {Array} The filtered list of devices.
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
                device.locationCity.toLowerCase().includes(filterValue.toLowerCase()) ||
                device.specs.some(spec =>
                    spec.value.toLowerCase().includes(filterValue.toLowerCase()) ||
                    spec.specName.toLowerCase().includes(filterValue.toLowerCase()) // Add this line
                )
            );
        }
        return filteredDevices;
    }, [data, filterValue, hasSearchFilter]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    /**
     * Handles changing the number of rows per page.
     * 
     * @param {Event} e - The change event.
     */
    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    /**
     * Paginates the filtered items.
     * 
     * @returns {Array} The paginated list of filtered items.
     */
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, rowsPerPage, filteredItems]);

    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'name',
        direction: 'ascending'
    });

    /**
     * Sorts the items based on the sort descriptor.
     * 
     * @returns {Array} The sorted list of items.
     */
    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            let first, second;
            if (sortDescriptor.column === 'specs') {
                first = a.specs.map(spec => spec.specName + ' ' + spec.value).join(', ');
                second = b.specs.map(spec => spec.specName + ' ' + spec.value).join(', ');
            } else {
                first = a[sortDescriptor.column];
                second = b[sortDescriptor.column];
            }
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    /**
     * Handles the search input change.
     * 
     * @param {string} value - The new search input value.
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
     * Sets the initial filter value based on the query parameter.
     */
    useEffect(() => {
        const searchQuery = router.query.search;
        if (searchQuery) {
            setFilterValue(searchQuery.toString());
        }
    }, [router.query.search]);

    /**
     * Clears the search filter.
     */
    const onClear = useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    /**
     * Renders the top content including the search input and rows per page selector.
     * 
     * @returns {JSX.Element} The top content element.
     */
    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex items-end justify-between gap-3'>
                    <Input
                        isClearable
                        className='w-full sm:max-w-[44%]'
                        placeholder='Zoek op modelnaam...'
                        startContent={<FaSearch />}
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

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    /**
     * Opens the modal for the selected device.
     * 
     * @param {Object} device - The selected device.
     */
    const openModal = (device) => {
        setSelectedDevice(device);
        setModalVisible(true);
    };

    /**
     * Closes the modal.
     */
    const closeModal = () => {
        setSelectedDevice(null);
        setModalVisible(false);
    };

    /**
     * Handles saving the edited device.
     * 
     * @param {Object} editedDevice - The edited device.
     */
    const handleSave = (editedDevice) => {
        console.log("Saving edited device:", editedDevice);
        // Find and update the device in the local state
        //setData(updatedData);
        data = data.map(device => device.id === editedDevice.id ? editedDevice : device);
    };

    const [message, setMessage] = useState(null);

    const [isError, setIsError] = useState(false); // Add this state

    function Notification({ message }) {

        const messageClass = isError ? "bg-red-500" : "bg-green-500";

        return (
            <div className={`fixed bottom-40 right-20 text-white px-6 py-3 text-lg rounded shadow-md ${messageClass}`} style={{zIndex: 9999}}>
                {message}
            </div>
        );
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this device?")) {
            try {
                // Replace with your delete request
                let response = await fetch(`http://localhost:8080/devices/${id}`, {
                    method: 'DELETE',
                });
                let responseJSON = await response.json();
                if (responseJSON.statusCode === 200) {
                    setIsError(false);
                    setMessage(responseJSON.message);
                } else {
                    setIsError(true);
                    setMessage(responseJSON.message);
                }
            } catch (error) {
                console.error('Failed to delete device:', error);
            }
        }
    };

    return (
        <div>
            {message && <Notification message={message} onClose={() => setMessage(null)} />}
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
                    <TableColumn allowsSorting key="specs">Specifications</TableColumn>
                    <TableColumn>Actions</TableColumn>
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
                            <TableCell>
                                {item.specs && item.specs.length > 0 ? (item.specs.map((spec, index) => (
                                    <div key={index}>{spec.specName} : {spec.value}</div>
                                ))
                                ) : (<div>Niet beschikbaar</div>)}
                                <hr className="w-full h-0.5 mx-auto m-2 bg-gray-300 border-0 rounded dark:bg-gray-700" />
                            </TableCell>
                            <TableCell>
                                <Button className="m-1 h-8 w-4" color="primary" onClick={() => openModal(item)}>
                                    <FaRegEdit />
                                </Button>
                                <Button className="m-1 h-8 w-4" color="danger" onClick={() => handleDelete(item.id)}>
                                    <MdDeleteForever />
                                </Button>
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

            <DeviceModal
                device={selectedDevice}
                isOpen={modalVisible}
                onClose={closeModal}
                onSave={handleSave}
                setMessage={setMessage}
                setIsError={setIsError}
            />
        </div>
    );
}
