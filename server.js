const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routers = require('./app/routes/routes');
const app = express();
const HttpException = require('./app/utils/HttpException');
const errorMiddleware = require('./app/middleware/error.middleware');
var corsOptions = {
    origin: "http://example.com"
    ,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

//db.sequelize.sync();
// // drop the table if it already exists
/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/
app.use('/uploads', express.static('./uploads'));
app.use(`/api`,  express.urlencoded(),Routers);
// simple route
app.use(errorMiddleware);

app.all('*', (req, res, next) => {
    console.log(process.env.DB_HOST)
    // const err = new HttpException(404, 'Endpoint Not Found');
    // next(err);
    console.log("dssssssss");
    res.send({ "name": "ezeze" });
});

// Error middleware
app.use(errorMiddleware);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
