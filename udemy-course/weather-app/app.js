const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")

const address = process.argv[2];

if(!address) {
    console.log("No address provided");
    process.exit()
}

geocode(process.argv[2], (error, {latitude, longitude, location} = {}) => {
    if(error){
        console.log('Error:', error);
        return;
    }

    forecast(latitude, longitude, (error, {temperature, feelsLike} = {}) => {
        if(error){
            console.log("Error:", error);
            return;
        }
        
        console.log(location);
        console.log("Temperature:", temperature);
        console.log("Feels like:", feelsLike);

    });
});