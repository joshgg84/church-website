const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Serving church website');
        
            fs.readFile('index.html', 'utf8', (err, content) => {
                    if (err) {
                                console.log('Error, sending fallback');
                                            res.writeHead(200, { 'Content-Type': 'text/html' });
                                                        res.end(`
                                                                        <!DOCTYPE html>
                                                                                        <html>
                                                                                                        <head><title>Our Church</title></head>
                                                                                                                        <body style="text-align:center;padding:50px;">
                                                                                                                                            <h1>Welcome to Our Church</h1>
                                                                                                                                                                <p>✅ Website is working!</p>
                                                                                                                                                                                    <p>Sunday 10:00 AM</p>
                                                                                                                                                                                                    </body>
                                                                                                                                                                                                                    </html>
                                                                                                                                                                                                                                `);
                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                                                                                                                                                                                                res.end(content);
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                            const PORT = process.env.PORT || 3000;
                                                                                                                                                                                                                                                                            server.listen(PORT, '0.0.0.0', () => {
                                                                                                                                                                                                                                                                                console.log('✅ Church site on port', PORT);
                                                                                                                                                                                                                                                                                });