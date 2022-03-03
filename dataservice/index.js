const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dataservice = require('./dataservice.js');

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/data', (req, res) => {
    res.send(dataservice.getData('data.json'));
})

app.post('/weather', (req, res) => {
    validator.addObject('weatherdb.json', req.body.temperature, req.body.humidity, req.body.pressure, req.body.place, req.body.day, req.body.month, req.body.year, req.body.hour, req.body.minute, (err, res) => {

    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})