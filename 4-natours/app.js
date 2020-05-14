const express = require('express');

const app = express();

// Setting up the port to listen
const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});