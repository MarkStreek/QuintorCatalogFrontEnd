// pages/api/fetchdummydata.js
// This module defines an API endpoint for fetching dummy data.

/**
 * Handles the request to fetch dummy data from /api/fetchdummydata endpoint.
 * @param {Object} req - The request object representing the incoming HTTP request.
 * @param {Object} res - The response object used for sending back the desired HTTP response.
 */
export default async function handler(req, res) {
    // Log the request to fetch dummy data.
    console.log('Recieved a request to fetch dummy data');

    // Check if the request method is GET.
    if (req.method == "GET") {
        try {
            // Attempt to fetch data from specified endpoint.
            const response = await fetch('http://localhost:8080/api/v1/dummy-controller', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Log the recieved response from the server.
            console.log('Response from server', response);

            // Extract the JSON data from the response
            const dummyData = await response.json();

            // Log the extracted dummy data.
            console.log('Dummy data', dummyData);

            // Respond with a 200 OK status code and send the dummy data in JSON format.
            res.status(200).json(dummyData);
            } catch (error) {
                // Log any errors that occur during the fetch request.
                console.error('Error fetching dummy data', error);

                // Respond with a 500 Internal Server Error status code and an error message in JSON format.
                res.status(500).json({ error: 'Error fetching dummy data' });
            }
        }
    }