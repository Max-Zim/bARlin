'use strict'

const round = (float, decimals) => {
  const pow = Math.pow(10, decimals)
  return Math.round(float*pow)/pow
}

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const distance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a));
}

const addDistance = (sights, lat, lon) => {
  return sights.map((sight) => {
    sight.distance = round(distance(sight.location.lat, sight.location.lon, lat, lon), 3)
    return sight
  })
}

module.exports = {
  getMultipleRandom,
  distance,
  addDistance,
  round
}