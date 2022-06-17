const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direcotry and views location
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Mattias Strömdahl",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Mattias Strömdahl",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is some helpful text.",
        name: "Mattias Strömdahl",
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, { temperature, feelsLike } = {}) => {
            if (error) {
                return res.send({error});
            }

            return res.send({
                temperature,
                feelsLike,
                location,
                address
            });
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query);

    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help",
        errorMessage: "404 Help article not found",
        name: "Mattias Strömdahl",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Mattias Strömdahl",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
