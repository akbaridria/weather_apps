const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const apiKey = "9dcadd5305e2ee50bf9306abd3b202de";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
    res.render("index", {weather:null, error:null});
});


app.post('/', function(req, res) {
    let city = req.body.city;
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(apiUrl, function(err, response, body) {
        if(err){
            console.log(err)
            res.render('index', {weather : null, error : err})
        } else {
            let data = JSON.parse(body);
            console.log(data);
            if(data.weather == undefined) {
                res.render("index", {weather : null, error : `error kota tidak ditemukan`})
            } else {
                res.render("index", {weather : `current weather is ${data.weather[0].main} and the temperatur is ${data.main.temp} C`, error : null})
            }
        }
       
    })
    
});


app.listen(8080, function() {
    console.log("App Running in port 8080!!");
})

