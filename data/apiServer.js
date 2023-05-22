const http = require('http')
const fs = require('fs')
const path = require('path')
const { json } = require('stream/consumers')

const apiData = require('./data/inventory.json')

http
.createServer((req, res) => {
  console.log(`${req.method} response is ${req.url}`)
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/json'})
    res.end(JSON.stringify(apiData))
  }
})
.listen(3000, () => {
  console.log('listening to port 3000')
})