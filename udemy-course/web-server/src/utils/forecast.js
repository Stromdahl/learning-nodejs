const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3e9667cd30b8a46a0013ba24b8d2370d&query=${latitude},${longitude}`;
    
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
        return;
      }
  
      if (body.error) {
        callback("Unable to find location", undefined);
        return;
      }
  
      data = {
          temperature: body.current.temperature,
          feelsLike: body.current.feelslike
      }
      
      callback(undefined, data);
    });
  };

module.exports = forecast