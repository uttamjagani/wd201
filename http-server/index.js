const http = require('http');
const fs = require('fs');
const minimist = require('minimist');

// Parse command-line arguments
const args = minimist(process.argv.slice(2));

// Default to port 3000 if not specified
const port = args.port || 3000;

// Create a server
const server = http.createServer((req, res) => {
  if (req.url === '/registration') {
    fs.readFile('registration.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading registration.html');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}else if (req.url === '/project') {
    fs.readFile('project.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading project.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    fs.readFile('home.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading home.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

// Listen on the specified port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
