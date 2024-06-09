const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../models/tours");

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

    it("should retrieve a specific tour", async () => {
      const tour = await Tour.findOne();
      const res = await request(app).get(`/tours/${tour.slug}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
      expect(res.body.data.tour.name).toEqual(
        "Vietnam Highlights: Pearl of Indochina"
      );
    });

    it("should search for tours", async () => {
      const searchQuery = "Vietnam";
      const res = await request(app).get(`/tours/search?query=${searchQuery}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual("success");
      expect(Array.isArray(res.body.data.tours)).toBe(true);
    });
  });
});
