// src/pages/updateDevice/UpdateDevice.js

/**
 * Updates a device by sending a PUT request to the backend.
 * 
 * @async
 * @param {Object} device - The device object containing updated details.
 * @returns {Promise<Object>} The updated device data from the backend.
 * @throws Will throw an error if the update operation fails.
 */
export const updateDevice = async (device) => {
    try {
        // Send a PUT request to the backend with the updated device data
        const response = await fetch(`http://localhost:8080/devices/${device.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(device)
        });

        // Read the response as text
        const text = await response.text();
        console.log("Backend response:", text); // Log the response

        // Check if the response status is not OK (200-299)
        if (!response.ok) {
            throw new Error('Failed to update device'); // Throw an error if the response is not OK
        }

        // Parse the response text as JSON
        const data = JSON.parse(text);
        return data; // Return the parsed JSON data
    } catch (error) {
        console.error('Error updating device:', error); // Log any errors
        throw error; // Rethrow the error to be handled by the caller
    }
};