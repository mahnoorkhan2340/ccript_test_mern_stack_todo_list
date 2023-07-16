
const express = require("express");
var cors = require("cors");  // Handling of cross origin requests
const todos = require("./src/routes/todos.route");
const port = 3000;


// initializes express app
const app = express();


// application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();


// corss-origin-allow-all
app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// sets default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to TODO Node.js application backend." });
});


// todos api routes
 app.use('/api/v1', todos);  



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




