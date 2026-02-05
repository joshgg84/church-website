const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('Request received for:', req.url);
        
            const filePath = path.join(__dirname, 'index.html');
                console.log('Looking for file at:', filePath);
                    
                        fs.readFile(filePath, 'utf8', (err, content) => {
                                if (err) {
                                            console.error('Error reading file:', err.message);
                                                        res.writeHead(500, { 'Content-Type': 'text/html' });
                                                                    res.end(`
                                                                                    <h1>Server Error</h1>
                                                                                                    <p>Could not find index.html</p>
                                                                                                                    <p>Error: ${err.message}</p>
                                                                                                                                `);
                                                                                                                                            return;
                                                                                                                                                    }
                                                                                                                                                            
                                                                                                                                                                    console.log('File found, sending response');
                                                                                                                                                                            res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                                                                                                                    res.end(content);
                                                                                                                                                                                        });
                                                                                                                                                                                        });

                                                                                                                                                                                        const PORT = process.env.PORT || 3000;
                                                                                                                                                                                        server.listen(PORT, '0.0.0.0', () => {
                                                                                                                                                                                            console.log('✅ Server started on port', PORT);
                                                                                                                                                                                            });