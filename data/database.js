const mongodb = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const MongoClient = mongodb.MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db("cse341");;
      console.log("MongoDB Connected"); // DEBUG
      callback(null, database);
    })
    .catch((err) => {
      console.log("MongoDB Error:", err); // DEBUG
      callback(err);
    });
};

const getDb = () => {
  return database;
};

module.exports = { initDb, getDb };