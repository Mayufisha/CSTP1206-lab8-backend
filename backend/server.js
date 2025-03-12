const express = require("express");
   const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const axios = require("axios");
app.get("/weather", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f9875665a116b1b2851044bb414b2ecb`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
