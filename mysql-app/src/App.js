import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

const App = () => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [csvFileMap, setCsvFileMap] = useState({});
  const [selectedQueryText, setSelectedQueryText] = useState('');

  useEffect(() => {
    // Define the CSV files for each predefined query
    const predefinedCsvFiles = {
      'Select customerID, companyName, contactName, contactTitle, country from customers;': './Query1.csv',
      'Select customerID, companyName, contactName, contactTitle, country from customers where country = "Germany";': './Query2.csv',
      'Select customerID, companyName, contactName, contactTitle, country from customers where contactTitle = "Owner";': './Query3.csv',
    };

    // Fetch and parse the CSV data for each predefined query
    const fetchData = async () => {
      try {
        const fetchPromises = Object.values(predefinedCsvFiles).map(async (csvFile) => {
          const response = await fetch(csvFile);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const csvText = await response.text();
          const parsedData = Papa.parse(csvText, { header: true }).data;
          return parsedData;
        });

        const fetchedData = await Promise.all(fetchPromises);
        const csvFileMap = {};
        Object.keys(predefinedCsvFiles).forEach((query, index) => {
          csvFileMap[query] = fetchedData[index];
        });

        setCsvFileMap(csvFileMap);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const predefinedQueries = [
    'Select customerID, companyName, contactName, contactTitle, country from customers;',
    'Select customerID, companyName, contactName, contactTitle, country from customers where country = "Germany";',
    'Select customerID, companyName, contactName, contactTitle, country from customers where contactTitle = "Owner";',
  ];

  const handleQuerySelect = (query) => {
    setSelectedQuery(query);

    // Get the query text from the predefinedQueries array using the index of the selected query
    const selectedQueryIndex = predefinedQueries.indexOf(query);
    if (selectedQueryIndex !== -1) {
      setSelectedQueryText(predefinedQueries[selectedQueryIndex]);
    }
  };

  const displayData = () => {
    // Display data based on the selected option (predefined query)
    if (selectedQuery !== '') {
      // Check if the data exists in the csvFileMap for the selected query
      if (csvFileMap[selectedQuery]) {
        return csvFileMap[selectedQuery];
      } else {
        return []; // Return an empty array if data for the selected query is not available
      }
    } else {
      return []; // Show all data by default
    }
  };
  

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAnchorLinkClick = (e, target) => {
    e.preventDefault();
    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SQL Query Data Viewer</h1>
        <button className="scroll-to-top-button" onClick={handleScrollToTop}>
          &#8593; Scroll to Top
        </button>
      </header>
      <div className="app-content">
        <nav className="app-nav">
          <ul>
            <li>
              <a
                href="#query-selector"
                onClick={(e) => handleAnchorLinkClick(e, '#query-selector')}
              >
                Select Query
              </a>
            </li>
            <li>
              <a
                href="#data-display"
                onClick={(e) => handleAnchorLinkClick(e, '#data-display')}
              >
                Displayed Data
              </a>
            </li>
          </ul>
        </nav><br/><br/>
        <div className="query-selector" id="query-selector">
          <h3>Select a Predefined Query:</h3><br/>
          <select onChange={(e) => handleQuerySelect(e.target.value)}>
            <option value="">--Select a Query--</option>
            {predefinedQueries.map((query, index) => (
              <option key={index} value={query}>
                {query}
              </option>
            ))}
          </select>
        </div><hr/>
        {selectedQueryText && selectedQuery && (
        <div className="selected-query-text">
          <br/><p><b>Selected Query:</b> &emsp; {selectedQueryText}</p><br/><hr/>
        </div>
      )}
        <div className="data-display" id="data-display">
          <h2>Displayed Data</h2>
          <table>
            <thead>
              <tr>
              <th>customerID</th>
              <th>companyName</th>
              <th>contactName</th>
              <th>contactTitle</th>
              <th>country</th>
              </tr>
            </thead>
            <tbody>
              {displayData().map((item, index) => (
                <tr key={index}>
                  <td>{item.customerID}</td>
                  <td>{item.companyName}</td>
                  <td>{item.contactName}</td>
                  <td>{item.contactTitle}</td>
                  <td>{item.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Made by Yash Agarwal</p>
      </footer>
    </div>
  );
};

export default App;
