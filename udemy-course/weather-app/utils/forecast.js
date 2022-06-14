const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3e9667cd30b8a46a0013ba24b8d2370d&query=${latitude},${longitude}`;
    
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
        return;
      }
  
      if (response.body.error) {
        callback("Unable to find location", undefined);
        return;
      }
  
      data = {
          temperature: response.body.current.temperature,
          feelsLike: response.body.current.feelslike
      }
      
      callback(undefined, data);
    });
  };

module.exports = forecast