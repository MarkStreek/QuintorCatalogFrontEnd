import React, { useState } from 'react';
import { Button, Card, Textarea } from '@nextui-org/react';
import RootLayout from "@/app/components/RootLayout/RootLayout";
import UseFetch from '@/hooks/UseFetch';
import { MdClose } from 'react-icons/md';
import withAuth from "@/app/components/withAuth";

/**
 * This component renders a form for submitting a borrowed device request.
 * 
 * @returns {JSX.Element} The BorrowedRequest component.
 */
const BorrowedRequest = () => {
    const { data: devices, loading: devicesLoading, error: devicesError } = UseFetch('http://localhost:8080/devices');
    const { data: users, loading: usersLoading, error: usersError } = UseFetch('http://localhost:8080/borrowedstatus/users');
    const [userName, setUserName] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const borrowRequest = {
            userName,
            deviceId: parseInt(deviceId, 10),
            description,
        };

        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            const response = await fetch('http://localhost:8080/borrowedstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                },
                body: JSON.stringify(borrowRequest),
            });

            if (response.ok) {
                setIsError(false);
                setMessage('Apparaat succesvol uitgeleend');
            } else {
                const errorData = await response.json();
                setIsError(true);
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setIsError(true);
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <RootLayout>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                    {(devicesLoading || usersLoading) ? (
                        <p>Loading...</p>
                    ) : (devicesError || usersError) ? (
                        <p>Error loading data: {devicesError ? devicesError.message : usersError.message}</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h4>Uitleen verzoek</h4>
                            <br />
                            <hr />
                            <br />
                            <label htmlFor="userName">Werknemer:</label>
                            <select
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                style={{ width: '100%', marginBottom: '1rem' }}
                            >
                                <option value="" disabled>Selecteer een werknemer</option>
                                {Array.isArray(users) && users.map((user) => (
                                    <option key={user.id} value={user.name}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <hr />
                            <br />
                            <label htmlFor="deviceId">Apparaat</label>
                            <select
                                id="deviceId"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value)}
                                required
                                style={{ width: '100%', marginBottom: '1rem' }}
                            >
                                <option value="" disabled>Selecteer een apparaat</option>
                                {Array.isArray(devices) && devices.map((device) => (
                                    <option key={device.id} value={device.id}>
                                        {device.type}:{device.id} - {device.brandName} - {device.model}
                                    </option>
                                ))}
                            </select>
                            <hr />
                            <br />
                            <label htmlFor="description">Verzoek beschrijving:</label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{ width: '100%', marginBottom: '1rem' }}
                            />
                            <Button type="submit" color="primary" style={{ marginTop: '1rem' }}>
                                Verstuur
                            </Button>
                        </form>
                    )}
                    {message && <Notification message={message} onClose={() => setMessage(null)} />}
                </Card>
            </div>
        </RootLayout>
    );
};

export default withAuth(BorrowedRequest);
