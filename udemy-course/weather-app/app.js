const request = require('postman-request');

const url = "http://api.weatherstack.com/current?access_key=3e9667cd30b8a46a0013ba24b8d2370d&query=37.8267,-122.4233"

// request({url: url, json: true}, (error, response) => {
//     if(error){
//         console.log("Unable to connect to weather service!");
//         return;
//     }
    
//     if(response.body.error){
//         console.log("Unable to find location");
//         return;
//     }

//     const current = response.body.current;
//     const temperature = current.temperature;
//     const feelsLike = current.feelslike;
//     console.log('It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out');
// });


const geocodingURL = 'http://api.positionstack.com/v1/forward?access_key=202970e43c03ed30a09c1e55c8d20ebf&query=Svedala, Sweden&limit=1'

request({url: geocodingURL, json:true}, (error, response) => {
    if(error){
        console.log("Unable to connect to location service!");
        return;
    }

    if(response.body.error || response.body.data.length === 0){
        console.log("Unable to find location")
        return;
    }

    const lat = response.body.data[0].latitude
    const lon = response.body.data[0].longitude
    console.log("Latutude: " + lat)
    console.log("Longitude: " + lon)
})