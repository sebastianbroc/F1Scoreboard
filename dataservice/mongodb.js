//MongoDB Stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sebastian:30112001seb@cluster0.hdtfy.mongodb.net/Cluster0?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let client3 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });