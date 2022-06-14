const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")


geocode('Svedala, Sweden', (error, data) => {
    console.log('Error:', error);
    console.log('Data:', data);
});

forecast(55.513841, 13.231894, (error, data) => {
  console.log("Error:", error);
  console.log("Data:", data);
});
