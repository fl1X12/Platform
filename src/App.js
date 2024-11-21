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
      
      {/* Conditionally render either GetTest or PostTest based on selection */}
      {requestType === "GET" ? (
        <GetTest params={params} />
      ) : (
        <PostTest params={params} />
      )}
    </div>
  );
}

export default App;