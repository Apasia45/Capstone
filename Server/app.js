// 'Import' the Express module instead of http
import express from "express";
// Initialize the Express application
const app = express();

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(4040, () => console.log("Listening on port 4040"));

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  next(); // tell express to move to the next middleware function
};

app.use(myMiddleware); // use the myMiddleware for every request to the app
