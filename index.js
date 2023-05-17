const { MongoClient } = require('mongodb');
const url = "mongodb://0.0.0.0:27017/";
const bcrypt = require('bcrypt')
const saltRounds = 13

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url);

run().catch(console.error); // Run the async function

async function run() {
    try {
            // Connect the client to the server	(optional starting in v4.7) -Faru
            await client.connect();

            // Confirm a successful connection
            await client.db("admin");
            console.log("You successfully connected to MongoDB!");

            // Make the appropriate DB calls
            await listDatabases(client);

            // Create a document
            await createListing(client, {
                username: "zt",
                password: "321abc"
            });


        } 
            catch (e) {
                console.error(e);
                } finally {
                // Close the connection to the MongoDB cluster
                await client.close();
                }
}

// Print the names of all available databases
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));    //  list all the databases
}

// Create a collection
async function createListing(client, newListing){
    const result = await client.db("BENR2423").collection("Users").insertOne(newListing);
    console.log(`New data with id: ${result.insertedId} is created!`);     // Show that a new data created
}
