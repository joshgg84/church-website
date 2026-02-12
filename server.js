const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('📁', req.url);
    
    // Default to index.html for root
    let filePath = req.url === '/' ? 'index.html' : req.url.substring(1);
    
    // Get file extension
    const ext = path.extname(filePath);
    
    // Set content type
    const types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json'
    };
    
    const contentType = types[ext] || 'text/plain';
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found, try index.html
            fs.readFile('index.html', (err2, html) => {
                if (err2) {
                    res.writeHead(500);
                    res.end('500 - Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(html);
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log('=================================');
    console.log('✅ AFLAME CHURCH SERVER RUNNING');
    console.log('=================================');
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📖 Bible: http://localhost:${PORT}/bible.html`);
    console.log(`📅 Events: http://localhost:${PORT}/events.html`);
    console.log(`💰 Offerings: http://localhost:${PORT}/offerings.html`);
    console.log('=================================');
});