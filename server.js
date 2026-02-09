const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('Request:', req.url);
    
    // Map URLs to files
    if (req.url === '/bible' || req.url === '/bible.html') {
        serveFile('bible.html', 'text/html', res);
    } else if (req.url === '/bible.js') {
        serveFile('bible.js', 'text/javascript', res);
    } else if (req.url === '/' || req.url === '/index.html') {
        serveFile('index.html', 'text/html', res);
    } else {
        serveFile('index.html', 'text/html', res);
    }
});

function serveFile(filename, contentType, res) {
    fs.readFile(filename, (err, data) => {
        if (err) {
            console.log('Error serving', filename, err.message);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 - File Not Found</h1>');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Church website running on port ${PORT}`);
    console.log(`📖 Main site: http://localhost:${PORT}`);
    console.log(`📖 Bible app: http://localhost:${PORT}/bible`);
});