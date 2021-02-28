import { connect } from "mongoose";

const dbName = process.env.NODE_ENV === "test" ? "parkMeTest" : "parkMe";
const dbHost = process.env.NODE_ENV === "test" ? "localhost" : "mongo";
const mongoUri: string = `mongodb://${dbHost}:27017/${dbName}`;

const connectDb = async (): Promise<void> => {
  try {
    await connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default connectDb;
