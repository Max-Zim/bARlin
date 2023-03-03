'use strict'

const { filterByDistance, getClosest } = require("./filter")
const { addDistance } = require("./helper")

const searchSights = (querys, database) => {
  return new Promise(async (resolve, reject) => {
    if (querys.name) {
      database.findOne({
        name: {
          $regex: querys.name,
          $options: "i"
        }
      }).then((sight) => {
        console.log(`Found sight: ${sight.name}`)
        resolve(sight)
      })
        .catch((err) => reject(err))
    } else {
      if (querys.category) {
        const categories = JSON.parse(querys.category)
        var sights = await database.find({ category: categories }).toArray()
      } else {
        var sights = await database.find().toArray()
      }
      if (querys.distance && querys.location) {
        console.log("filtering by distance")
        const dist =  parseFloat(querys.distance);
        const location = JSON.parse(querys.location);
        sights = filterByDistance(sights, dist, location.lat, location.lon);
      }
      if (querys.closest && querys.closest == 'true' && querys.number) {
        console.log("Query closest")
        const number = JSON.parse(querys.number);
        const location = JSON.parse(querys.location);
        sights=getClosest(sights,location.lat, location.lon, number)
        sights=addDistance(sights, location.lat, location.lon)
        console.log(`Found ${sights.length} sights`)
        resolve(sights)
      }
      if (querys.number) {
        sights = sights.slice(0,JSON.parse(querys.number))
      }
      console.log(`Found ${sights.length} sights`)
      resolve(sights)
    }
  })
}

module.exports = {
  searchSights
}