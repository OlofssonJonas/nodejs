const express = require("express");
const connectDB = require("./src/db");
const app = express();
const Router = require("./src/routes/user.route");
const cookieSession = require("cookie-session");

app.use(express.json());
app.use(cookieSession({
    name: 'session',
    secret: 's3cr3t',
    maxAge: 1000 * 60,
    httpOnly: true,
    sameSite: true
}));

app.use("/api", Router);

connectDB();

PORT=2002;


app.listen(PORT, () => console.log(`server up and running on port ${PORT}`));

