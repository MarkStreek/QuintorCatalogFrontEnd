// pages/api/fetchdummydata.js
export default async function handler(req, res) {
    console.log('Recieved a request to fetch dummy data');
    if (req.method == "GET") {
        try {
            const response = await fetch('http://localhost:8080/api/v1/dummy-controller', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response from server', response);
            const dummyData = await response.json();
            console.log('Dummy data', dummyData);
            res.status(200).json(dummyData);
            } catch (error) {
                console.error('Error fetching dummy data', error);
                res.status(500).json({ error: 'Error fetching dummy data' });
            }
        }
    }