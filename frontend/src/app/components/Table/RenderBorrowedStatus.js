import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Button
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { format } from 'date-fns';
import BorrowedStatusModal from './BorrowedStatusModal';
import { MdClose } from 'react-icons/md';

/**
 * BorrowedStatusTableComponent is a component that renders a table displaying a list of borrowed statuses
 * with sorting, filtering, and pagination capabilities.
 * 
 * @param {Array} data - The array of borrowed status data to display.
 * @param {boolean} loading - A boolean indicating whether the data is currently loading.
 * @returns {JSX.Element} The BorrowedStatusTableComponent.
 */
const BorrowedStatusTableComponent = ({ data = [], loading }) => {
    const [filterValue, setFilterValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const hasSearchFilter = Boolean(filterValue);
    const router = useRouter();

    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const Notification = ({ message, onClose }) => {
        const messageClass = isError ? "bg-red-500" : "bg-green-500";
        return (
            <div className={`fixed top-20 right-20 text-white px-6 py-3 text-lg rounded shadow-md ${messageClass}`} style={{ zIndex: 9999 }}>
                {message}
                <button onClick={onClose} className="ml-4 text-2xl leading-none">
                    <MdClose />
                </button>
            </div>
        );
    };

    const openModal = (status) => {
        setSelectedStatus(status);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setSelectedStatus(null);
        setIsModalVisible(false);
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            const response = await fetch(`http://localhost:8080/borrowedstatus/approve/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });

            if (response.ok) {
                setIsError(false);
                setMessage('Verzoek goedgekeurd');
                closeModal();
                router.reload();
            } else {
                setIsError(true);
                setMessage('Verzoek afgekeurd');
            }
        } catch (error) {
            setIsError(true);
            setMessage('An error occurred');
            console.error('Failed to approve request:', error);
        }
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        try {
            const response = await fetch(`http://localhost:8080/borrowedstatus/reject/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });

            if (response.ok) {
                setIsError(false);
                setMessage('Verzoek afgewezen');
                closeModal();
                router.reload();
            } else {
                setIsError(true);
                setMessage('Verzoek niet afgewezen');
            }
        } catch (error) {
            setIsError(true);
            setMessage('An error occurred');
            console.error('Failed to reject request:', error);
        }
    };

    const filteredItems = useMemo(() => {
        let filteredStatuses = [...data];
        if (hasSearchFilter) {
            filteredStatuses = filteredStatuses.filter(status =>
                status.user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                status.device.type.toLowerCase().includes(filterValue.toLowerCase()) ||
                status.device.brandName.toLowerCase().includes(filterValue.toLowerCase()) ||
                status.status.toLowerCase().includes(filterValue.toLowerCase()) ||
                format(new Date(status.borrowDate), 'dd-MM-yyyy').toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        return filteredStatuses;
    }, [data, filterValue, hasSearchFilter]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, rowsPerPage, filteredItems]);

    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'user.name',
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

    useEffect(() => {
        const searchQuery = router.query.search;
        if (searchQuery) {
            setFilterValue(searchQuery.toString());
        }
    }, [router.query.search]);

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
                        placeholder='Zoek op gebruiker of apparaat...'
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

    return (
        <div>
            {message && <Notification message={message} onClose={() => setMessage(null)} />}
            <Table
                aria-label='Borrowed Status Tabel'
                topContent={topContent}
                color={"primary"}
                selectionMode={"none"}
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
                    <TableColumn allowsSorting key="user.name">Gebruikersnaam</TableColumn>
                    <TableColumn allowsSorting key="device.type">Apparaatnaam</TableColumn>
                    <TableColumn allowsSorting key="device.brandName">Merk</TableColumn>
                    <TableColumn allowsSorting key="status">Status</TableColumn>
                    <TableColumn allowsSorting key="borrowDate">Datum Uitgeleend</TableColumn>
                    <TableColumn key="actions">Acties</TableColumn>
                </TableHeader>
                <TableBody items={sortedItems} emptyContent={'Er zijn geen uitgeleende apparaten gevonden'}>
                    {sortedItems.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="align-top whitespace-pre-wrap">{item.user.name}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{item.device.type}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{item.device.brandName}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{item.status}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">{format(new Date(item.borrowDate), 'dd-MM-yyyy')}</TableCell>
                            <TableCell className="align-top whitespace-pre-wrap">
                                <Button onClick={() => openModal(item)}>Bekijk verzoek</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <BorrowedStatusModal
                isOpen={isModalVisible}
                onClose={closeModal}
                status={selectedStatus}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
};

export default BorrowedStatusTableComponent;