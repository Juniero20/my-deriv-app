export const getTokens = async () => {
    const API_URL = "https://localhost:8888/api/get_user_tokens.php";
    const token = sessionStorage.getItem('token');

    console.log('Attempting to fetch token from sessionStorage'); // Debug
    console.log('Retrieved JWT:', token); // Debug: Log token value

    if (!token) {
        console.error('No JWT found in sessionStorage');
        throw new Error('Not authenticated');
    }

    const authHeader = `Bearer ${token}`;
    console.log('Authorization header:', authHeader); // Debug: Log header

    try {
        console.log('Initiating fetch to:', API_URL);
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            },
        });

        let result;
        try {
            result = await response.json();
            console.log('Token fetch response:', result);
        } catch (error) {
            const text = await response.text();
            console.error("Raw Response:", error, text);
            throw new Error('Invalid JSON response: ' + text);
        }

        if (!response.ok) {
            console.error('Token fetch failed:', result.error);
            throw new Error(result.error || 'Fetching token failed. Please try again.');
        }

        console.log('Tokens fetched successfully:', result);
        return result;
    } catch (error) {
        console.error('Fetching token Error:', error.message);
        throw error;
    }
};