'use strict'

const toSight = (obj) => ({
  name: obj.title,
  location: {
    lon: parseFloat(obj.spatial.locLon),
    lat: parseFloat(obj.spatial.locLat)
  },
  link: obj.url,
  teaser: obj.teaser,
  category: []
})

const insertData = async (array, database) => {
  array.forEach(async sight => {
    //check for relevant Data
    if (sight.spatial) {
      //check if data is already in data base
      const check = await database.findOne({name: sight.title})
      if (!check){
        console.log(`Importing sight ${sight.title}`)
        database.insertOne(toSight(sight), (err, res) => {if (err) throw err})
      } else {
        console.log(`sight ${sight.title} already in database`)
      }
    } else {
      console.log(`No location Data for sight ${sight.title}, skipping object`)
    }
  });
}

const insertCategoryData = async (array, category, database) => {
  array.forEach(async sight => {
    //check if sight exists in database
    const check = await database.findOne({name: sight.title})
    if (check) {
      //add category to sight
      console.log(`Adding Category ${category}, to Sight ${check.name}`)
      check.category.push(category)
      database.replaceOne({name: sight.title}, check)
    } else {
      //check if spatial is included
      if (sight.spatial) {
        if (sight.spatial.locLat){
          console.log(`Importing new sight ${sight.title}`)
          const toimport = toSight(sight)
          toimport.category.push(category)
          database.insertOne(toimport, (err, res) => {if (err) throw err})
        } else {
          console.log("Missing Lat and Lon")
        }
      } else {
        console.log("No sight to update and no location data, will skip!")
      }
    }
  })
}

module.exports = {
  insertData,
  insertCategoryData
}