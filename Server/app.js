// 'Import' the Express module instead of http
import express from "express";
import dotenv from "dotenv";
const axios = require("axios");
import mongoose from "mongoose";

// Initialize the Express application
const app = express();
// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGODB, {
  // Configuration options to remove deprecation warnings, just include them to remove clutter
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const PORT = process.env.PORT || 4040;

const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

// app.get("/yelp", async (request, response) => {
//   const params = request.query;
//   console.log("yelpTest - params:", params);
//   const options = {
//     method: "GET",
//     url: "https://api.yelp.com/v3/businesses/search",
//     params: {
//       location: params.location,
//       attributes: params.attributes,
//       term: params.term,
//       zip_code: params.zip_code,
//       price: params.price
//     },
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${process.env.YELP_API_KEY}`
//     }
//   };
//   await axios
//     .request(options)
//     .then(function(yelpResponse) {
//       console.log("yelpTest - data:", yelpResponse.data);
//       response.json(yelpResponse.data.businesses);
//     })
//     .catch(function(error) {
//       console.error(error);
//     });
// });

// const myMiddleware = (request, response, next) => {
//   // do something with request and/or response
//   next(); // tell express to move to the next middleware function
// };

// app.use(myMiddleware); // use the myMiddleware for every request to the app

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
