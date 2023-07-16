// external modules import
const mongoose = require("mongoose");

const connectionString = "mongodb+srv://admin:Fastian2340@honeybee-cluster.kdtt5jf.mongodb.net/"; //process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    
    await mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB database successfully.");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB: ", error.message);
      });
  } catch (error) {
    console.log("Database connection error: ", error.message);
  }
};

module.exports = connectDatabase;
