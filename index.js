const { MongoClient } = require('mongodb');
const url = "mongodb://0.0.0.0:27017/";
const bcrypt = require('bcrypt')
const saltRounds = 13

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url);

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Make the appropriate DB calls
        await listDatabases(client);

        //create a document
        await createListing(client, {
            username: "fk",
            password: await encryptPassword("011018"),
        });

        // read a document
        await findOneListing(client, "fk");

        // update a document
        //await updateListing(client, "faru", { password: "011018" });

        // delete a document
        //await deleteListing(client, "faru");

        } catch (e) {
            console.error(e);
        } finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
}

run().catch(console.error); // Run the async function

// Print the names of all available databases
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// create a document
async function createListing(client, newListing){
    const result = await client.db("BENR2423").collection("Users").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// read a document
async function findOneListing(client, nameOfListing){
    result = await client.db("BENR2423").collection("Users").findOne({ username: nameOfListing });
    if (result) {
        console.log(`Found a listing in the collection with the username '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the username '${nameOfListing}'`);
    }
}

// update a document
async function updateListing(client, nameOfListing, updatedListing){
    result = await client.db("BENR2423").collection("Users").updateOne({ username: nameOfListing }, { $set: updatedListing });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

// delete a document
async function deleteListing(client, nameOfListing){
    result = await client.db("BENR2423").collection("Users").deleteOne({ username: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

const password = "011018"
async function encryptPassword(password) {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
  
    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);
  
    // Return the hash and salt
    return hash
  }