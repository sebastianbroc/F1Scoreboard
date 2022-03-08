//MongoDB Stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sebastian:30112001seb@cluster0.hdtfy.mongodb.net/Cluster0?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const getRaces =  async (callback) => {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect();
        const database = client.db('F1');
        const races = database.collection('races');


        let returnraces = []
        const race = await races.find().forEach(element => {
            returnraces.push(element);
        });
        returnraces = JSON.stringify(returnraces);

        return callback(null, returnraces);

    } catch(error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

getRaces((err, result) => {
    process.send(result);
})