const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
          <html>
              <head>
                    <title>Our Church</title>
                          <style>
                                  body { font-family: Arial; padding: 50px; text-align: center; }
                                          h1 { color: #2c3e50; }
                                                </style>
                                                    </head>
                                                        <body>
                                                              <h1>Welcome to Our Church</h1>
                                                                    <p>Website is now working!</p>
                                                                          <p>Service Times: Sunday 10:00 AM</p>
                                                                              </body>
                                                                                  </html>
                                                                                    `);
                                                                                    });

                                                                                    app.listen(PORT, () => {
                                                                                      console.log('Server running on port', PORT);
                                                                                      });l