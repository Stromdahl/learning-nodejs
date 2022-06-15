const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=202970e43c03ed30a09c1e55c8d20ebf&query=${encodeURIComponent(address)}&limit=1`
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
            return;
        }
        if(body.error || body.data.length === 0){
            callback("Unable to find location", undefined);
            return;
        }

        data = {
            latitude: body.data[0].latitude,
            longitude: body.data[0].longitude,
            location: body.data[0].label
        }
        callback(undefined, data);
    });
};

module.exports = geocode