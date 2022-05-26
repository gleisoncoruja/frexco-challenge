const mongoose = require("mongoose");

// Connection with MongoDB Atlas
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const strConnection = process.env.STR_CONNECTION;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}${strConnection}`
    );
    console.log("Conectou ao banco!");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
