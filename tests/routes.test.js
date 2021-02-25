// const request = require("supertest");
// // import User from "../src/model/User";
// const app = require("../../dist/app.js");
// import app from "./../src/app";
// const mongoose = require("mongoose");
//
// beforeAll(async () => {
//   const url = `mongodb://localhost:27017/parkme`;
//   await mongoose.connect(url, { useNewUrlParser: true });
// });
//
// afterAll(async () => {
//   //   await dropAllCollections();
//   // Closes the Mongoose connection
//   await mongoose.connection.close();
// });
//
// describe("Test unauthorised spaces request", () => {
//   test("It should not allow access", async (done) => {
//     await request(app)
//       .get("/spaces")
//       .then((response) => {
//         expect(response.status).toBe(401);
//         done();
//       });
//   });
// });
//
// // describe("Test the root path", () => {
// //   it("Should save user to database", async (done) => {
// //     const response = await request(app)
// //       .post("/users/signup")
// //       .type("form")
// //       .send({
// //         username: "Zell",
// //         email: "testing@gmail.com",
// //         password: "asdadasdasd",
// //         forename: "Martin",
// //         surname: "Ashcroft",
// //         department: "I.T.",
// //       });
// //     expect(response.status).toBe(200);
// //     const user = await User.default.findOne({ email: "testing@gmail.com" });
// //     expect(user.forename).toBeTruthy();
// //     expect(user.email).toBeTruthy();
// //     done();
// //   });
// // });

test("basic", async () => {
  const test = true;
  expect(test).toBe(true);
});
