const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.end(data)
  })
});
  const port = process.env.PORT || 3000
  server.listen(port, '0.0.0.0', () => {
    console.log('Church website running')
    })