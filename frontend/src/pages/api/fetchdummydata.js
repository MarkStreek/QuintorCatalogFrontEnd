// pages/api/fetchdummydata.js
// This module defines an API endpoint for fetching dummy data.

/**
 * Async function to handle the request to fetch dummy data from the REST API.
 * The function sends a GET request to the REST API and returns the dummy data in JSON format.
 * If an error occurs, the function logs the error message and returns a status error code.
 * 
 * @param {Object} req - The request object representing the incoming HTTP request.
 * @param {Object} res - The response object used for sending back the desired HTTP response.
 * @returns status codes and dummy data in JSON or error messages in JSON format.
 */
export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).json({ error: 'Method not allowed' });
    } else {
        try {
            let response = await fetch('http://localhost:8080/api/v1/dummy-controller', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                let dummyData = await response.json();
                // Return a 200 OK status code and the dummy data in JSON format
                return res.status(200).json(dummyData);
            } else {
                // Status code was not 200 OK, return an error message
                return res.status(response.status).json({ error: `Error fetching the REST API, received status code: ${response.status}` });
            }
        } catch (error) {
            // Return a 500 Internal Server Error status code and an error message
            return res.status(500).json({ error: 'Error fetching dummy data' });
        }
    }
}
