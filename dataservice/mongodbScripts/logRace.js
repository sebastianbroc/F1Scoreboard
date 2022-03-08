//MongoDB Stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
const {fork} = require("child_process");
const uri = "mongodb+srv://sebastian:30112001seb@cluster0.hdtfy.mongodb.net/Cluster0?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let client2 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const logRace = async (racename, newdrivers, callback) => {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        //Log Race
        await client.connect();
        const database = client.db('F1');
        const race = database.collection('races');

        let filter = { name: racename };
        let updateDoc = {
            $set: {
                finished: true
            },
        };


        let result = await race.updateOne(filter, updateDoc);
        if(result.matchedCount == 1){
         console.log(filter.name + " wurde eingetragen!");
        }

        //Log Driver Points
        const teams = database.collection('teams');

        let updateddrivers = [];
        let mongorequest = [];
        await teams.find().forEach(team => {
            updateddrivers = team.drivers;
            for(let i in updateddrivers){
                for(let t in newdrivers){
                    if(updateddrivers[i].name === newdrivers[t].name){
                        updateddrivers[i].points = newdrivers[t].points;
                    }
                }
            }

            filter = { name: team.name };
            let updateDoc = {
                $set: {
                    drivers: updateddrivers
                }
            };

            mongorequest.push({filter: filter, updateDoc: updateDoc});
        });
        updateTeam(mongorequest);

        return callback(null, "fertig!");
    } catch(error){
        console.log(error);
    } finally {
        await client.close();
    }
}

let updateTeam = async(mongoarray) => {
    client2 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client2.connect();
        const database = client2.db('F1');
        const teams = database.collection('teams');

        for(let i in mongoarray){
            let result = await teams.updateOne(mongoarray[i].filter, mongoarray[i].updateDoc);
            if(result.matchedCount == 1){
                console.log(mongoarray[i].filter.name + " wurde geupdated!");
            }
        }

    } finally {
        await client2.close();
        return new Promise((resolve, reject) => {
            resolve("Promise resolved");
        });
    }
}


process.on("message", function (message) {
    let request = JSON.parse(`${message}`);
    logRace(request.race, request.drivers, (err, result) => {
        process.send(result);
    })
});