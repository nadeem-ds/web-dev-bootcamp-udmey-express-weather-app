const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// app.post("/", function (res, req) {
//   console.log(req.body.cityName);
//   //   console.log("post received");
// });

app.post("/", function (req, res) {
  const city = req.body.cityName;

  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=4a455759030f656d8b52b547c261469c&units=metric";

  console.log(city);

  https.get(apiUrl, function (response) {
    response.on("data", function (data) {
      //parse convert js string to json
      const weatherData = JSON.parse(data);

      console.log(weatherData);

      const temp = weatherData.main.temp;

      const tempdesc = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon;

      //   const imageURL ="https://api.openweathermap.org/img/wn/" + icon + "@2x.png";
      const iconURL = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

      console.log(temp, tempdesc);

      res.send(
        `<h4>Your City ${city} Temperature:</h4> ${temp}
          <h4>Weather:</h4> ${tempdesc}<br>
          <img src="${iconURL}" >`
      );

      //   my code
      //   res.write('<head><meta charset="utf-8"></head>');

      //   res.write("<p> Weather condition is " + tempdesc + "</p>");

      //   res.write(
      //     "<h1>Your city temperature is " + temp + " C degree celcius</h1>"
      //   );
      //   res.write("<img src=" + imageURL + " >");

      //   res.send();
      //   <h3>Here's the current weather in ${weatherData.name}: </h3>

      //stringify convert json to js string
      //   var personalData = {
      //     name: "Nad",
      //     salary: 3000,
      //   };
      //   console.log(JSON.stringify(personalData));
    });
  });
});

app.listen("3000", function () {
  console.log("server running on 3000");
});
