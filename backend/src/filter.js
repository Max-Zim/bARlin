"use stric"

const { distance } = require("./helper")


const getClosest = (array, lat, lon, number) => {
  const user = {
    lat: lat,
    lon: lon
  }
  const sortDistance = (sight1 , sight2) => (distance(sight1.location.lat, sight1.location.lon, user.lat, user.lon) - distance(sight2.location.lat, sight2.location.lon, user.lat, user.lon))
  return array.sort(sortDistance).slice(0,number)
}

const filterByDistance = (array, radius, lat, lon) => {
  const out = []
  array.forEach((sight) => {
    if (distance(sight.location.lat, sight.location.lon, lat, lon) <= radius){
      out.push(sight)
    }
  })
  return out
}

module.exports = {
  getClosest,
  filterByDistance
}