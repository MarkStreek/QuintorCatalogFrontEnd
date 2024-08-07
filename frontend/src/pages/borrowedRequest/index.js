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

    /**
     * Notification component displays a notification message with an optional close button.
     *
     * @param {Object} props - The component props.
     * @param {string} props.message - The notification message to display.
     * @param {function} props.onClose - The callback function to be called when the close button is clicked.
     * @returns {JSX.Element} The rendered Notification component.
     */
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

    /**
     * Handles the form submission for the borrowed request.
     * 
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>} - A promise that resolves when the form submission is complete.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!description.trim()) {
            setIsError(true);
            setMessage('Fout: Beschrijving mag niet leeg zijn');
            setTimeout(() => {
                setMessage(null);
            }, 2000);
            return;
        }

        const borrowRequest = {
            userName,
            deviceId: parseInt(deviceId, 10),
            description,
        };
        
        const token = localStorage.getItem('token'); 

        try {
            const response = await fetch('http://localhost:8080/borrowedstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(borrowRequest),
            });

            if (response.ok) {
                setIsError(false);
                setMessage('Uitleenverzoek succesvol ingediend');
                // Clear the form
                setUserName('');
                setDeviceId('');
                setDescription('');
                setTimeout(() => {
                    setMessage(null);
                }, 2000);
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
            <div className="w-full">
                <h1 className="text-5xl md:mt-0 xs:mt-12 sm:mt-12">Uitleen verzoek</h1>
                <hr className="w-full h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-4 dark:bg-gray-700"/>
                <br/>
                <Card style={{width: '100%', padding: '2rem'}}>
                    {(devicesLoading || usersLoading) ? (
                        <p>Loading...</p>
                    ) : (devicesError || usersError) ? (
                        <p>Error loading data: {devicesError ? devicesError.message : usersError.message}</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="userName">Werknemer:</label>
                            <select
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                style={{width: '100%', marginBottom: '1rem'}}
                            >
                                <option value="" disabled>Selecteer een werknemer</option>
                                {Array.isArray(users) && users.map((user) => (
                                    <option key={user.id} value={user.name}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <hr/>
                            <br/>
                            <label htmlFor="deviceId">Apparaat</label>
                            <select
                                id="deviceId"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value)}
                                required
                                style={{width: '100%', marginBottom: '1rem'}}
                            >
                                <option value="" disabled>Selecteer een apparaat</option>
                                {Array.isArray(devices) && devices.map((device) => (
                                    <option key={device.id} value={device.id}>
                                        {device.type} - {device.id} - {device.brandName} - {device.model}
                                    </option>
                                ))}
                            </select>
                            <hr/>
                            <br/>
                            <label htmlFor="description">Verzoek beschrijving:</label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{width: '100%', marginBottom: '1rem'}}
                            />
                            <Button type="submit" color="primary" style={{marginTop: '1rem'}}>
                                Verstuur
                            </Button>
                        </form>
                    )}
                    {message && <Notification message={message} onClose={() => setMessage(null)}/>}
                </Card>
            </div>
        </RootLayout>
    );
};

export default withAuth(BorrowedRequest);
