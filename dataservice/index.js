const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const { fork } = require("child_process");
const bodyParser = require("body-parser");
const dataservice = require('./dataservice.js');
const mongoclient = require('./mongodb.js');


let options = {
};

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/teams',(req, res) => {
    const child = fork('mongodbScripts/getTeams.js');
    child.on("message", function (message) {
        //console.log(`Message from child.js: ${message}`);
        res.send(`${message}`);
    });
})

app.get('/races', (req, res) => {
    const child = fork('mongodbscripts/getRaces.js');
    child.on("message", function (message) {
        //console.log(`Message from child.js: ${message}`);
        res.send(`${message}`);
    });
})

/*
app.post('/logRace', (req, res) => {
    dataservice.logRace('races.json', 'teams.json', req.body.race, req.body.drivers, (err, res) => {
        console.log(res);
    });
})
*/

app.post('/logRace', (req, res) => {
    const child = fork('mongodbscripts/logRace.js');

    child.send(JSON.stringify(req.body));

    child.on("message", function (message) {
        //console.log(`Message from child.js: ${message}`);
    });



    /*
    mongoclient.logRace(req.body.race, req.body.drivers, (err, result) => {
        //console.log("Rennen " + req.body.race + " erfolgreich eingetragen!")
        console.log(result);
    })
     */
})


/*
let server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});
*/













app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

