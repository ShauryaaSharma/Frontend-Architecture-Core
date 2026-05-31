require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./route/admin")
const userRouter = require("./route/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});