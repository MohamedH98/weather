const express = require('express')
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = 'ca688b360ab6116f84c730099c32377b'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    https.get(url, (response) => {
        console.log(response.statusCode)
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>The weather in ${query} is looking like some ${description} it's ${temp}</h1>`);
            res.write(`<img src=${imgURL}>`);
            res.send();
        })
    })
})
app.listen(3000, () => {
    console.log("listening");
})