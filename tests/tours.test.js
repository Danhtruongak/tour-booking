/*const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

describe("Test Suite", () => {
  beforeAll(async () => {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);
    console.log("Connected to the test database");
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log("Disconnected from the test database");
  });

  describe("Tour Routes", () => {
    it("should retrieve all tours", async () => {
      const res = await request(app).get("/tours");
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
      expect(Array.isArray(res.body.data.tours)).toBe(true);
    }, 60000);
  });
});*/
