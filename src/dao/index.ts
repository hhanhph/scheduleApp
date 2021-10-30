import mongoose from "mongoose";
let isConnected: boolean;

const connectToDatabase = (): Promise<mongoose.Connection> => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve(mongoose.connection);
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(process.env.MONGODB_URI as string)
    .then((db) => {
      isConnected = db.connections[0].readyState === 1;
      return db.connection;
    });
};

export default connectToDatabase;
