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

app.get('/teams', (req, res) => {
    res.send(dataservice.getData('teams.json'));
})

app.get('/races', (req, res) => {
    res.send(dataservice.getData('races.json'));
})

app.post('/logRace', (req, res) => {
    dataservice.logRace('races.json', 'teams.json', req.body.race, req.body.drivers, (err, res) => {
        console.log(res);
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})