import { connect } from "mongoose";
const MONGOURI = "mongodb://mongo:27017/parkme";

const connectDb = async () => {
  try {
    await connect(MONGOURI, {
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
