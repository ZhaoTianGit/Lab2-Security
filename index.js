const { MongoClient } = require('mongodb');
const url = "mongodb://0.0.0.0:27017/";
const bcrypt = require('bcrypt')
const saltRounds = 13

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url);

run().catch(console.error); // Run the async function

async function run() {
    try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();

            // Send a ping to confirm a successful connection
            await client.db("admin");
            console.log("You successfully connected to MongoDB!");

        } 
            catch (e) {
                console.error(e);
                } finally {
                // Close the connection to the MongoDB cluster
                await client.close();
                }
}


