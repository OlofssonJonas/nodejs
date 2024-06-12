const express = require("express");
const connectDB = require("./src/db");
const app = express();
const userRouter = require("./src/routes/users.route");
const productRouter = require("./src/routes/products.route");
const cookieSession = require("cookie-session");

app.use(express.json());

app.use(cookieSession({
    secret: 's3cr3t',
    maxAge: 1000 * 10,
    httpOnly: false,
}));

app.use("/api", userRouter, productRouter);

connectDB();

PORT=2002;


app.listen(PORT, () => console.log(`server up and running on port ${PORT}`));

