const express = require('express');
const cookoieParser = require('cookie-parser');
const authRouther = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookoieParser());
app.use("/api/auth", authRouther)

module.exports = app;