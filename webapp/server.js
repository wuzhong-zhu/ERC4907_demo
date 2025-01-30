const express = require('express');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});