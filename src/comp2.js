import React, { useState } from 'react';
import './Comp2.css'; 

const PostTest = ({ params }) => {
    const [data, setData] = useState([{ key: 'title', value: '' }, { key: 'body', value: '' }, { key: 'userId', value: 1 }]);
    const [resp, setResp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };

    const addKeyValuePair = () => {
        setData([...data, { key: '', value: '' }]);
    };

    const removeKeyValuePair = (index) => {
        setData(data.filter((_, i) => i !== index));
    };

    const postData = async () => {
        if (!params?.baseurl || !params?.endpoint) {
            setError("Invalid base URL or endpoint.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const formattedData = data.reduce((acc, { key, value }) => {
            if (key) acc[key] = value;
            return acc;
        }, {});

        try {
            const response = await fetch(`${params.baseurl}/${params.endpoint}`, {
                method: "POST",
                body: JSON.stringify(formattedData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            const jsonResp = await response.json();
            setResp(jsonResp);
        } catch (err) {
            setError('Failed to post data.');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    return (
        <div className="container">
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                {data.map((item, index) => (
                    <div className="form-group" key={index}>
                        <input
                            type="text"
                            placeholder="Key"
                            value={item.key}
                            onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={item.value}
                            onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => removeKeyValuePair(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addKeyValuePair} className="add-btn">
                    Add Key-Value Pair
                </button>
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? 'Posting...' : 'Submit'}
                </button>
            </form>
            {error && <p className="error-msg">{error}</p>}
            {resp && !error && (
                <div className="response">
                    <h2>Response from Server:</h2>
                    <pre>{JSON.stringify(resp, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PostTest;
