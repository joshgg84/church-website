const http = require('http')
const server = http.createServer((req, res) => {
  res.end(`<h1 style="color: blue; font-size: 18px;">Welcome to Our Church!</h1>`)
  })
  const port = process.env.PORT || 3000
  server.listen(port, '0.0.0.0', () => {
    console.log('Church website running')
    })