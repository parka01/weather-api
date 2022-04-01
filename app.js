//jshint esversion:6
const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Suwon&units=metric&appid=895656d529b9eb4a40d7014a55601e3b";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      //res.send("Server is up and running." + temp);
      console.log(weatherData);
      console.log(temp);
      console.log(weatherDescription);
      res.write("<h1>The temperature in Suwon is " + temp + " degree Celsius </h1>" + "<br><h1>The weather is currently " + weatherDescription + ".<h1>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
