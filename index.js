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

            // Create a Data
            await createCollection(client, {
                username: "zt3",
                password: await encryptPassword("321abc")
            });

            // read a data
            //await findOneData(client, "zt2");

            // Update a data with possword
            //await updateData(client, "zt", { password: "654asd" });

            // delete a data
            //await deleteData(client, "zt");

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
async function createCollection(client, newData){
    const result = await client.db("BENR2423").collection("Users").insertOne(newData);
    console.log(`New data with id: ${result.insertedId} is created!`);     // Show that a new data created
}

// read a data
async function findOneData(client, nameOfData){
    result = await client.db("BENR2423").collection("Users").findOne({ username: nameOfData });
    if (result) {
        console.log(`Found the username '${nameOfData}':`);
        console.log(result);
    } else {
        console.log(`No data found with the username '${nameOfData}'`);
    }
}

// update a data
async function updateData(client, nameOfData, updatedData){
    result = await client.db("BENR2423").collection("Users").updateOne({ username: nameOfData }, { $set: updatedData });
    console.log(`${result.matchedCount} data matched the query criteria.`);
    console.log(`${result.modifiedCount} data was updated.`);
}

// delete a document
async function deleteData(client, nameOfData){
    result = await client.db("BENR2423").collection("Users").deleteOne({ username: nameOfData });
    console.log(`${result.deletedCount} data was deleted.`);
}

const password = "321abc"
async function encryptPassword(password) {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
  
    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);
  
    // Return the hash and salt
    return hash
  }