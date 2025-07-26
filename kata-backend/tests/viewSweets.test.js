const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

beforeAll(async () => {
  // Connect to MongoDB Atlas
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Close DB connection
  await mongoose.connection.close();
});

describe("GET /api/sweets", () => {
  it("should return all available sweets from MongoDB", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // Log every sweet name
    const names = res.body.map((sweet) => sweet.name);
    console.log("🍬 All Sweet Names:", names);

    // Optional: assert there's at least 1 sweet
    expect(res.body.length).toBeGreaterThanOrEqual(1);

    // Optional: log the first sweet
    console.log("🍬 First Sweet:", res.body[0]);
  });
});
