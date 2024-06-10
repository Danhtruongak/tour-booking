const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config.env" });

describe("Test Suite", () => {
  let token;

  beforeAll(async () => {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB, {});
    console.log("Connected to the test database");
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log("Disconnected from the test database");
  });

  describe("POST /login", () => {
    test("should log in a user with valid credentials", async () => {
      const validCredentials = {
        name: "Test User12345",
        email: "testdanhtours@example.com",
        password: "password123",
        passwordConfirm: "password123",
      };

      // Create a test user in the database
      await User.create(validCredentials);

      const response = await request(app).post("/users/login").send({
        email: validCredentials.email,
        password: validCredentials.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "success");
      expect(response.body).toHaveProperty("token");
      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data.user).toHaveProperty(
        "email",
        validCredentials.email
      );

      // Clean up the test user from the database
      await User.deleteOne({ email: validCredentials.email });
    });

    test("should return an error for invalid credentials", async () => {
      const invalidCredentials = {
        email: "invalid@example.com",
        password: "invalidpassword",
      };

      const response = await request(app)
        .post("/users/login")
        .send(invalidCredentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Incorrect email or password"
      );
    });
  });
});
