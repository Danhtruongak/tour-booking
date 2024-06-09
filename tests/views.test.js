/*const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

describe("Views routes", () => {
  beforeAll(async () => {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("Views Routes", () => {
    describe("GET /", () => {
      it("should retrieve the overview page", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("All Tours");
      });
    });

    describe("GET /tour/:slug", () => {
      it("should retrieve a specific tour page", async () => {
        const tourSlug = "vietnamHighlights";
        const res = await request(app).get(`/tour/${tourSlug}`);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain(
          "Vietnam Highlights: Pearl of Indochina tour"
        );
      });

      it("should return 404 if tour is not found", async () => {
        const nonExistentSlug = "non-existent-tour-slug";
        const res = await request(app).get(`/tour/${nonExistentSlug}`);
        expect(res.statusCode).toEqual(404);
        expect(res.text).toContain("There is no tour with that name.");
      });
    });

    describe("GET /login", () => {
      it("should retrieve the login form", async () => {
        const res = await request(app).get("/login");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Log into your account");
      });
    });

    describe("GET /tours/search", () => {
      it("should retrieve search results for tours", async () => {
        const searchQuery = "VietnamHightlights ";
        const res = await request(app).get(
          `/tours/search?query=${searchQuery}`
        );
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Search Results");
      });
    });

    describe("GET /tours/stats", () => {
      it("should retrieve tour statistics", async () => {
        const res = await request(app).get("/tours/stats");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Tour Statistics");
      });
    });
  });
});*/
