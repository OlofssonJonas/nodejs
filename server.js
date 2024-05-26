const express = require("express");
const connectDB = require("./src/db");
const app = express();
const Router = require("./src/router");

app.use(express.json());

app.use("/api", Router);

connectDB();



app.listen(3000, () => console.log('server up and running'));

