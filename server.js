const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determine which file to serve based on the URL
    let filePath;
    if (req.url === '/bible' || req.url === '/bible.html') {
        filePath = path.join(__dirname, 'bible.html');
    } else {
        filePath = path.join(__dirname, 'index.html');
    }
    
    // Read and serve the file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache'
            });
            res.end(`<h1>Error Reading ${path.basename(filePath)}</h1>`);
            return;
        }
        
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
        });
        res.end(data);
    });
});

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log("Website running on port 3000");
});