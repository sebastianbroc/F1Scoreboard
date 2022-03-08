const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sebastian:30112001seb@cluster0.hdtfy.mongodb.net/Cluster0?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const getTeams = async (callback) => {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect();
        const database = client.db('F1');
        const teams = database.collection('teams');


        let returnteams = []
        const race = await teams.find().forEach(element => {
            returnteams.push(element);
        });
        returnteams = JSON.stringify(returnteams);
        return callback(null, returnteams);

    } catch(error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

getTeams((err, result) => {
    process.send(result);
})