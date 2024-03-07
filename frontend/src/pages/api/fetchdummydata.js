// pages/api/fetchdummydata.js
// This module defines an API endpoint for fetching dummy data.

/**
 * Handles the request to fetch dummy data from /api/fetchdummydata endpoint.
 * @param {Object} req - The request object representing the incoming HTTP request.
 * @param {Object} res - The response object used for sending back the desired HTTP response.
 */
export default async function handler(req, res) {
    console.log('Received a request to fetch dummy data');

    // Check if the request method is GET.
    if (req.method === "GET") {
        try {
            // Attempt to fetch data from a specified endpoint.
            const response = await fetch('http://localhost:8080/api/v1/dummy-controller', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response from server', response);

            // Ensure the response is successful before trying to parse it as JSON.
            if (!response.ok) {
                throw new Error(`Error from server: ${response.statusText}`);
            }

            const dummyData = await response.json();
            console.log('Dummy data', dummyData);

            // Respond with a 200 OK status code and send the dummy data in JSON format.
            return res.status(200).json(dummyData);
        } catch (error) {
            console.error('Error fetching dummy data', error);

            // Respond with a 500 Internal Server Error status code if any errors occur during the fetch request.
            return res.status(500).json({ error: 'Error fetching dummy data' });
        }
    } else {
        // If the request method is not GET, return a 405 Method Not Allowed status code.
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
