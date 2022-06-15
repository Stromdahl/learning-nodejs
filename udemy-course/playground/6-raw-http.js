const http = require('http')

const latitude = 55.513841;
const longitude = 13.231894; 

const url = `http://api.weatherstack.com/current?access_key=3e9667cd30b8a46a0013ba24b8d2370d&query=${latitude},${longitude}`;

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk;
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log("An error", error)
})

request.end()