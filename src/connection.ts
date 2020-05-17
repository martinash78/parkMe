import { connect } from "mongoose";

let mongoUri: string = "mongodb://mongo:27017/parkme";

const connectDb = async () => {
  try {
    await connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default connectDb;
