//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const city = req.body.cityName;
  const apiKey = "895656d529b9eb4a40d7014a55601e3b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid="+ apiKey;

  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.write("<h1>The temperature in " + city + " is " + temp + " degree Celsius </h1>" + "<br><h1>The weather is currently " + weatherDescription + ".<h1>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
      res.send();
    });
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
