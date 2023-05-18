const {MongoClient}=require('mongodb');

let connectionDB;

module.exports={
    connectDB:(callback)=>{
        MongoClient.connect('mongodb://localhost:27017/bookstore')
        .then((client)=>{
            connectionDB=client.db();
            return callback();
        })
        .catch(err=>{
            console.log(err);
            return callback(err);
        })
    },
    getDB:()=>connectionDB
}

