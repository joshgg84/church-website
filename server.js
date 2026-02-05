const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('Request received for:', req.url);
        
            // Always serve index.html from public folder
                const filePath = path.join(__dirname, 'public', 'index.html');
                    console.log('Looking for file at:', filePath);
                        
                            fs.readFile(filePath, 'utf8', (err, content) => {
                                    if (err) {
                                                console.error('Error:', err.message);
                                                            // Fallback response if file not found
                                                                        res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                    res.end(`
                                                                                                    <!DOCTYPE html>
                                                                                                                    <html>
                                                                                                                                    <head><title>Church Site</title></head>
                                                                                                                                                    <body style="text-align:center;padding:50px;">
                                                                                                                                                                        <h1>Welcome to Our Church</h1>
                                                                                                                                                                                            <p>Service: Sunday 10:00 AM</p>
                                                                                                                                                                                                                <p style="color:red;">Note: index.html not found in public folder</p>
                                                                                                                                                                                                                                </body>
                                                                                                                                                                                                                                                </html>
                                                                                                                                                                                                                                                            `);
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                console.log('File found, serving content');
                                                                                                                                                                                                                                                                                            res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                                                                                                                                                                                                                                        res.end(content);
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                    const PORT = process.env.PORT || 3000;
                                                                                                                                                                                                                                                                                                                    server.listen(PORT, '0.0.0.0', () => {
                                                                                                                                                                                                                                                                                                                        console.log('✅ Server started on port', PORT);
                                                                                                                                                                                                                                                                                                                            console.log('📁 Serving from: public/index.html');
                                                                                                                                                                                                                                                                                                                            });