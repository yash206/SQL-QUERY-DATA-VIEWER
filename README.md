<h2>BASIC OVERVIEW</h2>

This project is built using React, a JavaScript library for building user interfaces. App.js serves as the core of the web application, where the SQL Query Data Viewer functionality is implemented. It utilizes React Hooks, specifically useState and useEffect, to manage state and perform side effects such as data fetching and parsing. The application offers users a selection of predefined SQL queries, and upon choosing a query, the app fetches the corresponding CSV file using the fetch API. The fetched CSV data is then parsed with the help of the **PapaParse** library, which facilitates efficient data extraction. The result of the selected query is displayed in a tabular format on the web page, allowing users to easily explore and analyze the results. User interaction is handled by updating the state with the selected query, triggering a dynamic display of relevant data. A Download CSV button is also available for the user to easily download the result of the applied query directly to their local computer.

<h3>JavaScript Framework</h3> The JavaScript framework used for this project is <b>React</b>.

<h3>Plugins or Packages</h3> 

In this web app, a major plugin that was installed is PapaParse, a powerful CSV parsing library for JavaScript. The PapaParse library is used to parse the fetched CSV data from the server, transforming it into an array of objects that can be easily manipulated and displayed in the application.

<h3>Page Load Time</h3>

I have used 2 websites for calculating the page load time.<br><br>
Name : <i>PageSpeed Insights</i><br>
Link : <a href = "https://pagespeed.web.dev/">https://pagespeed.web.dev/</a><br>
Result : 0.8s<br><br>
Name : <i>GTmetric</i><br>
Link : <a href = "https://gtmetrix.com/">https://gtmetrix.com/</a><br>
Result : 0.732s<br>
<h3>Optimisation</h3><br>
To optimize the initial load time of the app, I had done code splitting and used lazy loading for certain components. This way, the app will load only the essential parts initially, and other components will be loaded on-demand as the user interacts with the application. Also minimization of Js and CSS file to make it more compact helps in preventing unnecessary load time.
