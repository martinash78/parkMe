import { connect } from "mongoose";
const connectDb = () => {
  return connect("mongodb://mongo:27017/parkme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default connectDb;
