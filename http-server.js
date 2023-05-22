const http = require('http')
const fs = require('fs')
const path = require('path')

http
.createServer((req,res) => {
  console.log(`${req.method} request for ${req.url}`)
  if(req.url === '/'){
    fs.readFile('./public/index.html', 'utf-8', (err, html) => {
      if (err) throw err
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(html)
    })
  }
  else if (req.url.match(/.css$/)) {
    const cssPath = path.join(__dirname,'public', req.url)
    const fileStream = fs.createReadStream(cssPath, 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/css'})
    fileStream.pipe(res)
  }

  else if(req.url.match(/.jpg$/)) {
    const imagePath = path.join(__dirname, 'public', req.url)
    const fileStream = fs.createReadStream(imagePath)
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    fileStream.pipe(res)
  }

  else {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('404 File not found')
  }
})
.listen(3000, () => {
  console.log('listening on port 3000')
})



// Practicing with hard code html in a http server
// res.writeHead(200, {
//   'Content-Type': 'text/html'
// })
// res.end(`
// <!doctype html>
// <html>
//   <head>
//     <title>Hello Server</title>
//   </head>
//   <body>
//     <h1>Practicing with HTTP Server</h1>
//     <p>${req.url}</p>
//     <p>${req.method}</p>
//   </body>
// </html>
// `)