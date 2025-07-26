const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /api/sweets/search", () => {
  it("🔍 should search sweets by name (e.g., Ice Cream)", async () => {
    const res = await request(app).get("/api/sweets/search?name=ice cream");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log("✅ Matched by name:", res.body.map((s) => s.name));
  });

  const categories = ["traditional", "candy", "chocolate", "dryfruit", "dessert"];

  categories.forEach((category) => {
    it(`🔍 should search sweets by category: ${category}`, async () => {
      const res = await request(app).get(`/api/sweets/search?category=${category}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      console.log(`✅ Category [${category}] results:`, res.body.map((s) => s.name));
    });
  });

  it("🔍 should search sweets in price range (5 to 500)", async () => {
    const res = await request(app).get("/api/sweets/search?minPrice=5&maxPrice=500");
    expect(res.statusCode).toBe(200);
    expect(res.body.every((s) => s.price >= 5 && s.price <= 500)).toBe(true);
    console.log("✅ Sweets in price range 5–500:", res.body.map((s) => `${s.name} ₹${s.price}`));
  });
});
