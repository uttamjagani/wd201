const express = require('express');
const app = express();
const path = require('path');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default to port 3000 if not specified

// Serve the registration.html page
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
