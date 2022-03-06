var express = require('express')
var cors = require('cors')
var app = express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('http://example.com', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
const issue2options = {
    origin: "http://example.com",
    methods: ["GET"],
    credentials: true,
    maxAge: 3600
};
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.get('/products', cors(issue2options), function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ msg: 'This is CORS-enabled for only example.com.' })
})

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 80')
})