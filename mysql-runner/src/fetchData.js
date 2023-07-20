import fs from 'fs';
import axios from 'axios';
import csv from 'csvtojson';

const CSV_URL = '/customers.csv'; // Local CSV file in the public folder
const DB_JSON_FILENAME = 'db.json';

const fetchData = async () => {
  const response = await axios.get(CSV_URL);
  const data = await csv().fromString(response.data);
  return data;
};

(async () => {
  try {
    const jsonData = await fetchData();

    fs.writeFile(DB_JSON_FILENAME, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) throw err;
      console.log('Data successfully written to db.json');
    });
  } catch (error) {
    console.error('Error fetching or converting data:', error);
  }
})();
