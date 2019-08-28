const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
//const Admin = mongodb.Admin
const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";
const id = new ObjectID();
//const Ad =new Admin()
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("ooppps!Couldnt connect");
    else {
      //...........................UPDATE MANY.................//
      const db = client.db(databaseName)
      db.collection('users').updateMany({
        fuck :'new'
      },{
        $set:{
          fuck:'old'
        }
      }).then((result)=>{
        console.log(result.modifiedCount )
      }).catch((error)=>{
        console.log(error)
      })
      
      


      //...................LIST dbess...............//
      //const addb = client.db(databaseName).admin();
      // addb.listDatabases({ nameOnly: true }, (error, result) => {
      //   if (error) return console.log("could not find lists!");
      //   else {
      //     console.log(result);
      //   }
      // });
    }
  }
);

//const admindb = Client.db(databaseName).Admin()

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (error, client) => {
//     if (error) return console.log("ooppps!Couldnt connect");
//     else {
//       const db = client.db(databaseName);
//       db.collection("users").insertMany([
//         {
//           name: "shahzaib",
//           age: 21,
//           fuck: "new"
//         },
//         {
//           name: "shahzaib",
//           age: 22,
//           fuck: "new"
//         }
//       ]);
//     }
//   }
// );

/*
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.01:27017'
const databaseName = 'Neww'
MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error)
    return console.log('OOPS~-:)')
    else{
        const db =client.db(databaseName)
        db.collection('new').insertMany(
            [
        {
            name:'shahzaib',
            roolNO:'bitf16a009'

        },
        {
            name:'shahzaib',
            roolNO:'Bitf16a009',

        }
            ]
    )
    }
})*/
