const express = require("express");
const { readdirSync } = require("fs");
const connectDB = require("./Config/db");
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Alternatively, you can set specific origins
app.use(cors({
  origin: 'http://localhost:3000' // Allow only requests from your frontend
}));


// middleware
// app.use(bodyParser.json()); // แปลง json object เปน js object
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    const connection = await connectDB();
    
    // ส่ง connection ไปยัง controller ผ่าน middleware หรือ routes
    app.use((req, res, next) => {
      req.dbConnection = connection; // ส่ง connection เข้าไปใน request object
      next();
    });

    readdirSync("./Routes").map((r) => {
        const route = require(`./Routes/${r}`);
        app.use("/api", route);
        console.log('Routes Sucessfully')
      });
    
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
});
