const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    // Handle the /figs route
    console.log(req.url);
    if (req.url === '/') {
            // Serve the index.html file for the root route
            serveFile(res, 'index.html');
    } else {
        let q = url.parse(req.url, true);
        let filename = q.pathname + ".html";
        console.log("File: ", filename);
        serveFile(res, filename);
    } 
});

const serveFile = (res, fileName) => {
    const filePath = path.join(__dirname, 'public', fileName);
    console.log("File path: ", filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            serve404(res);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};

const serve404 = (res) => {
    const filePath = path.join(__dirname, 'public', '404.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};

const port = 8080;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});