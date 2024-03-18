import mongoose from "mongoose";

const connection = {}; /* creating connection object*/

const MONGODB_URI = process.env.ATLAS_URI;

async function dbConnect() {
  if (!MONGODB_URI) return;

  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */

  try {
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;