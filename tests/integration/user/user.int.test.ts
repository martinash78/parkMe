process.env.NODE_ENV = "test";
process.env.SECRET = "jansdlkanslkkausndasndalkdnaldkansl";

import request from "supertest";
import userRoutes from "../../../src/routes/user";
import User from "../../../src/model/User";
import app from "../../../src/app";
import mongoose from "mongoose";
import connectDb from "../../../src/connection";
import { UserService } from "../../../src/services/userService";
import { IUser } from "../../../src/interface/IUser";

const adminUserEmail = "admin@admin.com";
const adminPassword = "password";
let token = "";

beforeAll(async () => {
  connectDb()
    .then(() => {
      app.use("/users", userRoutes);
    })
    .catch((error) => {
      console.log(error);
    });

  const adminUserData = {
    isAdmin: true,
    email: adminUserEmail,
    password: adminPassword,
    forename: "Martin",
    surname: "Ashcroft",
    department: "I.T.",
  } as IUser;

  await UserService.createUser(adminUserData);
});

afterAll(async () => {
  await User.collection.deleteMany({});
  await mongoose.connection.close();
});

describe("Test unauthorised spaces request", () => {
  test("It should not allow access", async (done) => {
    await request(app)
      .get("/users")
      .then((response) => {
        expect(response.status).toBe(401);
      });
    done();
  });
});

describe("Test login", () => {
  it("Should return token", async (done) => {
    const response = await request(app).post("/users/login").type("form").send({
      email: adminUserEmail,
      password: adminPassword,
    });
    expect(response.status).toBe(200);
    token = response.body.token;
    done();
  });
});

describe("Test create user", () => {
  it("Should save user to database", async (done) => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", "Bearer " + token)
      .type("form")
      .send({
        email: "testing@gmail.com",
        password: "asdadasdasd",
        forename: "Martin",
        surname: "Ashcroft",
        department: "I.T.",
        isAdmin: true,
      });
    expect(response.status).toBe(200);
    const user = await User.findOne({ email: "testing@gmail.com" });
    expect(user.forename).toBeTruthy();
    expect(user.email).toBeTruthy();
    done();
  });
});
