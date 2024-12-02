const fetchData = async ({ baseurl, endpoint }) => {
    // Validate the input
    if (!baseurl || !endpoint) {
        throw new Error("Missing required parameters: 'baseurl' and 'endpoint'");
    }

    const url = `${baseurl}/${endpoint}`;

    try {
        const response = await fetch(url);

        // Handle response errors
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const tableObj = await response.json();

        // Ensure consistent output format as an array
        return Array.isArray(tableObj) ? tableObj : [tableObj];
    } catch (error) {
        // Handle fetch or JSON parsing errors
        throw new Error(error.message);
    }
};

export default fetchData;
