const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Gunakan router dari auth.js
app.use(authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});