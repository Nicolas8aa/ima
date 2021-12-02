const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_CNN);
    console.log("db connected :)");
  } catch (error) {
    throw new Error(e, "Awaking database error");
  }
};

module.exports = { dbConnection };
