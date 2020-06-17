var express = require('express');
var router = express.Router();
const getGeocode = require("../utils/getGeocode")
const getForecast = require("../utils/getForecast")

/* GET home page. */
router.get('/', async function(req, res, next) {
  try { 
    // get the city value
    const { city } = req.query
    console.log(city)

    if(!city)
      return res.render('index', { title: 'Weather App' });

    // get coordinates from the city name
    const location = await getGeocode(city)
    // use the location coords to get the forecast
    // get coords from location.geometry.coordinates
    const forecast = await getForecast(location.geometry.coordinates)
    console.log(forecast.current.weather)
    return res.render('index', { 
      title: 'Weather App',
      city: location.text,
      forecast: forecast.current 
    })

  } catch(err) {
    next(err)
  }
});

module.exports = router;
