const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse command-line arguments
const args = minimist(process.argv.slice(2));

// Default to port 3000 if not specified
const port = args.port || 3000;

// Create a server
const server = http.createServer((req, res) => {
    // Log the request URL
    console.log(`Request for: ${req.url}`);

    let filePath = '';

    // Determine the file to serve based on the request URL
    if (req.url === '/') {
        filePath = path.join(__dirname, 'http-server', 'home.html');
    } else if (req.url === '/project') {
        filePath = path.join(__dirname, 'http-server', 'project.html');
    } else if (req.url === '/registration') {
        filePath = path.join(__dirname, 'http-server', 'registration.html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    // Serve the requested file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading file');
        } else {
            const extname = path.extname(filePath);
            let contentType = 'text/html';

            // Set content type based on the file extension
            if (extname === '.js') {
                contentType = 'text/javascript';
            } else if (extname === '.css') {
                contentType = 'text/css';
            } else if (extname === '.json') {
                contentType = 'application/json';
            } else if (extname === '.png') {
                contentType = 'image/png';
            } else if (extname === '.jpg') {
                contentType = 'image/jpg';
            } else if (extname === '.gif') {
                contentType = 'image/gif';
            } else if (extname === '.svg') {
                contentType = 'image/svg+xml';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Listen on the specified port
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
