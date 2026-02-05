const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('Request for:', req.url);
        
            // Always serve public/index.html
                const filePath = path.join(__dirname, 'public', 'index.html');
                    
                        fs.readFile(filePath, 'utf8', (err, content) => {
                                if (err) {
                                            console.error('File error:', err.message);
                                                        // Fallback HTML
                                                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                res.end('<h1>Our Church</h1><p>Website Loading...</p>');
                                                                                            return;
                                                                                                    }
                                                                                                            
                                                                                                                    console.log('Serving index.html');
                                                                                                                            res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                                                                    res.end(content);
                                                                                                                                        });
                                                                                                                                        });

                                                                                                                                        const PORT = process.env.PORT || 3000;
                                                                                                                                        server.listen(PORT, '0.0.0.0', () => {
                                                                                                                                            console.log('✅ Church website server started on port', PORT);
                                                                                                                                                console.log('📁 Serving: public/index.html');
                                                                                                                                                });