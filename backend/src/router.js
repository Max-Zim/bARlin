const router = new require('express').Router()
const { response } = require("express");
const express = require("express")
const { ObjectId } = require('mongodb');
const { getClosest, filterByDistance } = require("./filter");
const { getMultipleRandom, addDistance } = require("./helper");
const { getJsonFromWeb } = require("./json");
const { searchSights } = require("./sights.controller");
const { insertData, insertCategoryData } = require("./sights.importer");

router.use(express.json())

router.get('/sights', async (request, response) => {
  const data = await request.app.locals.db.collection("sights").find().toArray()
  response.json(data)
});

router.get('/sights/number/:number', async (request, response) => {
  const lon = request.query.lon
  const lat = request.query.lat
  const dist = request.query.distance
  if (lon && lat) {
    const data = await request.app.locals.db.collection("sights").find().toArray()
    const sights = getClosest(data, lat, lon, request.params.number)
    if (dist == 'true') {
      response.json(addDistance(sights, lat, lon))
    } else response.json(sights)
  } else {
    const data = await request.app.locals.db.collection("sights").find().toArray()
    response.json(getMultipleRandom(data, request.params.number))
  }
});

router.get('/sights/distance/:radius', async (request, response) => {
  const lon = request.query.lon
  const lat = request.query.lat
  const radius = request.params.radius
  if (lon && lat && radius) {
    const data = await request.app.locals.db.collection("sights").find().toArray();
    response.json(filterByDistance(data, radius, lat, lon))
  } else {
    response.status(400).send({ "error": "Missing Query" })
  }
});

router.get('/sights/name/:sight', async (request, response) => {
  const data = await request.app.locals.db.collection("sights").findOne({ name: request.params.sight })
  response.json(data)
});

router.get('/sights/id/:id', async (request, response) => {
  const data = await request.app.locals.db.collection("sights").findOne({ _id: ObjectId(request.params.id) })
  response.json(data)
});

router.get('/sights/search', async (req, res) => {
  const query=req.query;
  const database = req.app.locals.db.collection('sights');
  console.log(query)
  searchSights(query, database).then((sights)=>{
    res.json(sights)
  })
  .catch((err) => {
    res.status(500).send({ "error": err })
  })
})

router.post('/setup', async (request, response) => {
  //get URL from Request
  const url = request.body.url || 'https://www.berlin.de/sehenswuerdigkeiten/a-bis-z/index.json'
  //get sights from JSON
  getJsonFromWeb(url).then(data => {
    insertData(data.data, request.app.locals.db.collection('sights'))
    response.json(data.data)
  })
    .catch((err) => {
      response.status(500).send({ "error": err })
    })
})
router.post('/setup/categories', async (request, response) => {
  //get URL from Request
  const urlarray = request.body
  console.log(urlarray)
  //get sights from JSON
  urlarray.forEach((cat) => {
    getJsonFromWeb(cat.url).then(data => {
      insertCategoryData(data.data, cat.category, request.app.locals.db.collection('sights'))
    })
      .catch((err) => {
        response.status(500).send({ "error": err })
      })
  })
  response.json(urlarray)
})

module.exports = router;