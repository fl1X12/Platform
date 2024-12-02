/* this makes use of components 
import React, { useRef, useState, useEffect } from 'react';

import GetTest from './comp1';
import PostTest from './comp2';

function App() {
  const URLref = useRef();
  const endpointref = useRef();
  const [url, setUrl] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [params, setParams] = useState({});
  const [requestType, setRequestType] = useState("GET"); // New state for request type

  const handleRequest = (event) => {
    event.preventDefault();
    setUrl(URLref.current.value);
    setEndpoint(endpointref.current.value);
  };

  useEffect(() => {
    if (url && endpoint) {
      setParams({ baseurl: url, endpoint: endpoint, method: requestType });
      console.log('Endpoint:', endpoint);
      console.log('Request Type:', requestType);
    }
  }, [url, endpoint, requestType]);

  return (
    <div>
    {//input handler 
    }

      <div className="InputHandler">
        <select 
          value={requestType} 
          onChange={(e) => setRequestType(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="GET">GET Request</option>
          <option value="POST">POST Request</option>
        </select>
        <input 
          type="text" 
          ref={URLref} 
          placeholder="Enter Base URL" 
          className="mx-2 p-2 border rounded"
        />
        <input 
          type="text" 
          ref={endpointref} 
          placeholder="Enter Endpoint" 
          className="mx-2 p-2 border rounded"
        />
        <button 
          onClick={handleRequest}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Output
        </button>
      </div>
      
      {// Conditionally render either GetTest or PostTest based on selection 
      }
      {requestType === "GET" ? (
        <GetTest params={params} />
      ) : (
        <PostTest params={params} />
      )}
    </div>
  );
}

export default App;
*/


// this makes use of the functions instead of components
import React, { useRef, useState } from 'react';
import fetchData from './getFunction';
import postData from './postFunction';

function App() {
  const URLref = useRef();
  const endpointref = useRef();
  const [requestType, setRequestType] = useState("GET"); // State for request type
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postPayload, setPostPayload] = useState([{ key: 'title', value: '' },{ key: 'body', value: '' },{ key: 'userId', value: "" }]);

  const handleRequest = async (event) => {
    event.preventDefault();
    const baseurl = URLref.current.value;
    const endpoint = endpointref.current.value;

    if (!baseurl || !endpoint) {
        setError("Base URL and endpoint are required.");
        return;
    }

    setError(null);
    setIsLoading(true);

    try {
        if (requestType === "GET") {
            const response = await fetchData({ baseurl, endpoint });
            setData(response);
        } else if (requestType === "POST") {
            const response = await postData({ baseurl, endpoint, data: postPayload });
            setData(response);
        }
    } catch (err) {
        console.log(error);
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};


  const handlePostPayloadChange = (index, field, value) => {
    const updatedPayload = [...postPayload];
    updatedPayload[index][field] = value;
    setPostPayload(updatedPayload);
  };

  const addPostPayloadField = () => {
    setPostPayload([...postPayload, { key: '', value: '' }]);
  };

  const removePostPayloadField = (index) => {
    setPostPayload(postPayload.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Input handler */}
      <div className="InputHandler">
        <select 
          value={requestType} 
          onChange={(e) => setRequestType(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="GET">GET Request</option>
          <option value="POST">POST Request</option>
        </select>
        <input 
          type="text" 
          ref={URLref} 
          placeholder="Enter Base URL" 
          className="mx-2 p-2 border rounded"
        />
        <input 
          type="text" 
          ref={endpointref} 
          placeholder="Enter Endpoint" 
          className="mx-2 p-2 border rounded"
        />
        <button 
          onClick={handleRequest}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Output
        </button>
      </div>

      {requestType === "POST" && (
        <div className="PostPayloadEditor">
          <h3>Configure POST Payload</h3>
          {postPayload.map((field, index) => (
            <div key={index} className="flex items-center mb-2">
              <input 
                type="text" 
                placeholder="Key" 
                value={field.key} 
                onChange={(e) => handlePostPayloadChange(index, 'key', e.target.value)} 
                className="p-2 border rounded mr-2"
              />
              <input 
                type="text" 
                placeholder="Value" 
                value={field.value} 
                onChange={(e) => handlePostPayloadChange(index, 'value', e.target.value)} 
                className="p-2 border rounded mr-2"
              />
              <button 
                onClick={() => removePostPayloadField(index)} 
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            onClick={addPostPayloadField} 
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Field
          </button>
        </div>
      )}

      {/* Display results or error messages */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-msg">Error: {error}</p>}
      {!isLoading && !error && data && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
