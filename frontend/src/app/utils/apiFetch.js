/**
 * Fetches data from an API endpoint.
 *
 * @param {string} url - The URL of the API endpoint.
 * @param {Object} [options={}] - Additional options for the fetch request.
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
};

export default apiFetch;
