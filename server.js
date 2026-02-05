// ULTRA SIMPLE WORKING SERVER
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('Request received:', req.url);
    
      res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
                <html>
                    <head>
                          <title>Our Church</title>
                                <style>
                                        body {
                                                  font-family: Arial, sans-serif;
                                                            text-align: center;
                                                                      padding: 50px;
                                                                                background: #f0f8ff;
                                                                                        }
                                                                                                h1 {
                                                                                                          color: #2c3e50;
                                                                                                                    margin-bottom: 20px;
                                                                                                                            }
                                                                                                                                    .success {
                                                                                                                                              background: #27ae60;
                                                                                                                                                        color: white;
                                                                                                                                                                  padding: 20px;
                                                                                                                                                                            border-radius: 10px;
                                                                                                                                                                                      margin: 20px auto;
                                                                                                                                                                                                max-width: 500px;
                                                                                                                                                                                                        }
                                                                                                                                                                                                              </style>
                                                                                                                                                                                                                  </head>
                                                                                                                                                                                                                      <body>
                                                                                                                                                                                                                            <h1>Welcome to Our Church!</h1>
                                                                                                                                                                                                                                  <div class="success">
                                                                                                                                                                                                                                          <h2>✅ Website is Working!</h2>
                                                                                                                                                                                                                                                  <p>Service Times: Sunday 10:00 AM</p>
                                                                                                                                                                                                                                                          <p>Location: 123 Faith Street</p>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                      <p>Contact: info@ourchurch.org | (123) 456-7890</p>
                                                                                                                                                                                                                                                                          </body>
                                                                                                                                                                                                                                                                              </html>
                                                                                                                                                                                                                                                                                `);
                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                server.listen(PORT, '0.0.0.0', () => {
                                                                                                                                                                                                                                                                                  console.log(\`✅ Church website running on port \${PORT}\`);
                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                  server.on('error', (error) => {
                                                                                                                                                                                                                                                                                    console.error('Server error:', error);
                                                                                                                                                                                                                                                                                    });