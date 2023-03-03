const express = require("express");
const http = require('http');
const https = require('https');
const fs = require("fs")
const app = express();
const httpServer = http.createServer(app);
const path = require("path")
const ApiRouter = require('./router')
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const cors = require('cors');

const httpsServer = https.createServer({
  key: fs.readFileSync(path.resolve(process.cwd() + '../../extra_files/test_certs/server.key')),
  cert: fs.readFileSync(path.resolve(process.cwd() + '../../extra_files/test_certs/server.cert')),
}, app);

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api', ApiRouter)
app.use(express.static(process.cwd() + '../../frontend/public'));

app.get("/", (request, response) => {
    response.send("Webpage");
});

app.get("/ar", (request, response) => {
  response.sendFile(path.resolve(process.cwd() + '../../frontend/public/ar.html'));
});

app.get("/about", (request, response) => {
  response.sendFile(path.resolve(process.cwd() + '../../frontend/public/about.html'));
});

app.get("/imprint", (request, response) => {
  response.sendFile(path.resolve(process.cwd() + '../../frontend/public/imprint.html'));
});

app.get('/openAPI', (request, response) => {
  response.sendFile(path.resolve(process.cwd() + '/src/bARlin.yaml'))
});



MongoClient.connect('mongodb://barlin-db:27017/', (error, database) => {
	if (error) {
		console.log ('[ERROR]: the following error occurred trying to connect to the database:');
		console.log (error);
		return;
	}

  app.locals.db = database.db('barlin');

  httpServer.listen(3080, '0.0.0.0', () => {
    console.log('Express server started on port %s at %s', httpServer.address().port, httpServer.address().address);
  });
  httpsServer.listen(3443, '0.0.0.0', () => {
    console.log('Express https server started on port %s at %s', httpsServer.address().port, httpsServer.address().address);
  });

})
