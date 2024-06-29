const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const path = require("path");
const morgan = require("morgan");

const server = express();
server.name = "API";

require("./db.js");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
	definition: {
 		openapi: "3.1.0",
 		info: {
 			title: "Node.js - Express API",
 			version: "1.0.0",
 		},
 		servers: [
 			{
 				url: "https://another-to-do-app.onrender.com/",
 			},
 		],
 	},
 	apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
	res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/api", routes);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;