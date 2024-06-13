/**
 * Updates a device by sending a PUT request to the backend.
 *
 * @async
 * @param {Object} device - The device object containing updated details.
 * @param setMessage
 * @param setIsError
 * @returns {Promise<Object>} The updated device data from the backend.
 * @throws Will throw an error if the update operation fails.
 */
export const updateDevice = async (device, setMessage, setIsError) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
        // Send a PUT request to the backend with the updated device data
        const response = await fetch(`http://localhost:8080/devices/${device.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            body: JSON.stringify(device)
        });

        // Read the response as JSON
        const data = await response.json();

        if (response.ok) {
            setIsError(false);
        } else {
            setIsError(true);
        }
        setMessage(data.message);
        setTimeout(() => {
            setMessage(null);
        }, 4000);

        // Check if the response status is not OK (200-299)
        if (!response.ok) {
            throw new Error('Failed to update device'); // Throw an error if the response is not OK
        }
    } catch (error) {
        console.error('Error updating/saving the updated device:', error); // Log any errors
        throw error; // Rethrow the error to be handled by the caller
    }
};
