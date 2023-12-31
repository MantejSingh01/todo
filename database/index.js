const mongoose = require("mongoose");

async function ConnectMongoDb() {
  try {
    const connect = await mongoose.connect("mongodb://localhost:23000/extra",{
      connectTimeoutMS: 500, // Set a timeout value in milliseconds
    }  
    );

    if (connect.connections[0].readyState !== 0) {
      console.log("MongoDB connected successfully!");
    } else {
      console.log("MongoDB connection failed.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { ConnectMongoDb };
