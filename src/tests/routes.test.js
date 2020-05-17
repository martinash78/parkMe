const request = require("supertest");
const User = require("../../dist/model/User");
const app = require("../../dist/app.js");
const mongoose = require("mongoose");
const databaseName = "test";

beforeAll(async () => {
  const url = `mongodb://localhost:27017/parkmeTest`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
  //   await dropAllCollections();
  // Closes the Mongoose connection
  await mongoose.connection.close();
});

describe("Test unathourised spaces request", () => {
  test("It should not allow access", async (done) => {
    await request(app)
      .get("/spaces")
      .then((response) => {
        expect(response.status).toBe(401);
        done();
      });
  });
});

describe("Test the root path", () => {
  it("Should save user to database", async (done) => {
    const response = await request(app)
      .post("/users/signup")
      .type("form")
      .send({
        username: "Zell",
        email: "testing@gmail.com",
        password: "asdadasdasd",
        forename: "Martin",
        surname: "Ashcroft",
        department: "I.T.",
      });
    expect(response.status).toBe(200);
    const user = await User.default.findOne({ email: "testing@gmail.com" });
    expect(user.forename).toBeTruthy();
    expect(user.email).toBeTruthy();
    done();
  });
});
