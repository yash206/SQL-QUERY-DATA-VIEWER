import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import Navbar from './Navbar';

const App = () => {
  // State variables using React Hooks
  const [selectedQuery, setSelectedQuery] = useState('');
  const [csvFileMap, setCsvFileMap] = useState({});
  const [selectedQueryText, setSelectedQueryText] = useState('');

  // useEffect to fetch and parse CSV data for predefined queries
  useEffect(() => {
    // Define the CSV files for each predefined query
    const predefinedCsvFiles = {
      'SELECT * FROM Foods;': './Query1.csv',
      'SELECT * FROM Foods WHERE Frequency = "Weekly";': './Query2.csv',
      'SELECT * FROM Foods ORDER BY Spend DESC;': './Query3.csv',
      'SELECT * FROM Foods WHERE Spend>50;': './Query4.csv',
      'SELECT * FROM Foods WHERE Gender = "Female" AND Frequency = "Daily";': './Query5.csv',
      'SELECT * FROM Foods WHERE Gender = "Male" AND (Item = "Sushi" OR Item = "Ice Cream" OR Item = "Donut");': './Query6.csv',
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

  // Array of predefined SQL queries
  const predefinedQueries = [
    'SELECT * FROM Foods;',
    'SELECT * FROM Foods WHERE Frequency = "Weekly";',
    'SELECT * FROM Foods ORDER BY Spend DESC;',
    'SELECT * FROM Foods WHERE Spend>50;',
    'SELECT * FROM Foods WHERE Gender = "Female" AND Frequency = "Daily";',
    'SELECT * FROM Foods WHERE Gender = "Male" AND (Item = "Sushi" OR Item = "Ice Cream" OR Item = "Donut");',
  ];

  // Handler for selecting a query
  const handleQuerySelect = (query) => {
    setSelectedQuery(query);

    const selectedQueryIndex = predefinedQueries.indexOf(query);
    if (selectedQueryIndex !== -1) {
      setSelectedQueryText(predefinedQueries[selectedQueryIndex]);
    }
  };

  // Function to display data based on selectedQuery
  const displayData = () => {
    if (selectedQuery !== '') {
      if (csvFileMap[selectedQuery]) {
        return csvFileMap[selectedQuery];
      } else {
        return [];
      }
    } else {
      return []; 
    }
  };
  
  // Handler for scrolling to the top of the page
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle downloading of CSV file
  const handleDownloadCSV = () => {
    if (csvFileMap[selectedQuery]) {
      const csv = Papa.unparse(csvFileMap[selectedQuery]);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedQuery}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // JSX code to render the component
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SQL Query Data Viewer</h1>
        <button className="scroll-to-top-button" onClick={handleScrollToTop}>
          &#8593; Scroll to Top
        </button>
      </header>
      <div className="app-content">
        <Navbar /><br/><br/>
        {/* Radio button to select the default query */}
        <input type="radio" name="option" value="Foods.csv" checked />
        <label htmlFor="Foods.csv"><b>Foods.csv</b></label><br/>
        <br/>
        <div className="query-selector" id="query-selector">
          <h3>Select a Predefined Query:</h3><br/>
          {/* Dropdown to select the predefined queries */}
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
          <h1>Displayed Data</h1><br/>
          {selectedQuery && (
            <button onClick={handleDownloadCSV}>Download CSV</button>
          )}
          <table>
            <thead>
              <tr>
                <th>CustomerID</th>
                <th>FirstName</th>
                <th>Gender</th>
                <th>City</th>
                <th>Frequency</th>
                <th>Item</th>
                <th>Spend</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through data to display rows */}
              {displayData().map((item, index) => (
                <tr key={index}>
                  <td className="alt1">{item.CustomerID}</td>
                  <td className="alt2">{item.FirstName}</td>
                  <td className="alt1">{item.Gender}</td>
                  <td className="alt2">{item.City}</td>
                  <td className="alt1">{item.Frequency}</td>
                  <td className="alt2">{item.Item}</td>
                  <td className="alt1">{item.Spend}</td>
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
