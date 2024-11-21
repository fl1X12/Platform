import React from 'react'

const RenderJsonObject = ({ data }) => {
    const renderContent = (value) => {
        // If the value is an object, recursively render its keys and values
        if (typeof value === 'object' && value !== null) {
          // If it's an array, map through it
          if (Array.isArray(value)) {
            return (
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{renderContent(item)}</li>
                ))}
              </ul>
            );
          }
          return (
            <ul>
              {Object.keys(value).map((key) => (
                <li key={key}>
                  <strong>{key}:</strong> {renderContent(value[key])}
                </li>
              ))}
            </ul>
          );
        }
        // For other types (string, number, boolean), just return the value
        return value.toString();
      };
    
      return (
        <div>
          {renderContent(data)}
        </div>
      );
};


export default RenderJsonObject;
