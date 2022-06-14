const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=202970e43c03ed30a09c1e55c8d20ebf&query=${encodeURIComponent(address)}&limit=1`
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
            return;
        }
        if(response.body.error || response.body.data.length === 0){
            callback("Unable to find location", undefined);
            return;
        }

        data = {
            latitude: response.body.data[0].latitude,
            longitude: response.body.data[0].longitude,
            location: response.body.data[0].label
        }
        callback(undefined, data);
    });
};

module.exports = geocode