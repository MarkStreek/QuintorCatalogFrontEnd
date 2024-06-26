import { useState, useEffect } from 'react';

/**
 * Custom React hook that fetches data from a given URL.
 * Right before starting the fetch, it sets the loading state to true.
 * If the fetch is successful, it sets the data state to the fetched data.
 * If the fetch fails, it sets the error state to the error object.
 * Finally, it sets the loading state to false.
 *
 * @param url - The URL to fetch data from.
 * @returns {{data: *[], loading: boolean, error: string}}
 * @constructor
 */
export default function UseFetch(url) {
    // REACT hooks to store information about the fetch
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            try {
                let response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let data = await response.json();
                // Set the data state to the fetched data
                setData(data);
            } catch (error) {
                // Set the error state to the error object
                setError(error);
            } finally {
                // loading to false after the fetch is done
                setLoading(false);
            }

        }
        void fetchData();
    }, [url]);

    return { data, loading, error };
}
