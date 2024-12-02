const postData = async ({ baseurl, endpoint, data }) => {
    // Validate input parameters
    if (!baseurl || !endpoint) {
        throw new Error("Invalid base URL or endpoint.");
    }
    console.log(data)
    console.log(typeof(data))
    // Format data into an object
    const formattedData = data.reduce((acc, { key, value }) => {
        if (key) acc[key] = value;
        return acc;
    }, {});

    try {
        const response = await fetch(`${baseurl}/${endpoint}`, {
            method: "POST",
            body: JSON.stringify(formattedData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        // Check response status
        if (!response.ok) {
            throw new Error('Failed to post data');
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (err) {
        // Throw any errors encountered
        throw new Error(err.message || 'Failed to post data');
    }
};

export default postData;
