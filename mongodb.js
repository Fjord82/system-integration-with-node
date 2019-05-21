// CRUD create read update delete

// Original code
/*
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
*/

// Destructoring code
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'noSql-with-mongodb';

// Working with the Object ID - this is global unique for noSQL dbs
/*
const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString().length);
*/

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');
    }

   const db =  client.db(databaseName);


   //----------Create----------//
   // Create One document inside customers collecctions
  /* db.collection('customers').insertOne({
       name: 'JesperTheChamp',
       age: 23
   }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }

        console.log(result.ops);
   })*/


   // Create multiple documents inside cusstomers collections
  /* db.collection('customers').insertMany([
       {
           name: 'Edwin',
           age: 23
       }, {
           name: 'Rasmus',
           age: 37
       }
   ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents');
        }

        console.log(result.ops);
   }) */

        //------------Read-------------//
    // Read and fetches one document by ObjectI
        /*
        db.collection("customers").findOne(
      { _id: new ObjectID("5ce43a034a6ca7bf57c3013f") },
      (error, customer) => {
        if (error) {
          return console.log("Unable to fetch data");
        }

        console.log(customer);
      });
      */

      db.collection('customers').find({ age: 37 }).toArray((error, customers) => {
          console.log(customers);
      })

    db.collection('customers').find({ age: 37 }).count((error, count) => {
        console.log(count);
    })

});
