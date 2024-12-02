import React, { useState, useEffect } from 'react';
import "./Comp1.css";

const GetTest = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const { baseurl, endpoint } = params || {};
        const url = `${baseurl}/${endpoint}`;

        if (!endpoint || !baseurl) {
            return;
        }

        const getJSON = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const tableObj = await response.json();
                const dataArray = Array.isArray(tableObj) ? tableObj : [tableObj];
                setData(dataArray);
                setLoading(false);
                console.log(url);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        getJSON();
    }, [params]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default GetTest;
