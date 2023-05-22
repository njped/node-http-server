const https = require('https')
const fs = require('fs')

const options = {
  hostname: 'en.wikipedia.org',
  port: 443,
  path: '/wiki/George_Washington',
  method: 'GET'

}

let responseBody;

const req = https.request(options, (response) => {
  response.setEncoding('utf-8')
  console.log(`Status Code: ${response.statusCode}`);
  console.log(`Response Headers: ${JSON.stringify(response.headers)}`)

  response.once('data', (chunck) => {
    console.log(chunck)
  })

  response.on('data', chunck => {
    console.log(chunck.length)
    responseBody += chunck
  })

  response.on('end', () => {
    fs.writeFile('george-washington.html', responseBody, err => {
      if (err) throw err;
      console.log('File downloaded')
    })
  })
})

req.end()