// tests/addSweet.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config(); // ✅ Load .env file

beforeAll(async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/sweets", () => {
  it("should add a new sweet with all fields", async () => {
    const res = await request(app).post("/api/sweets").send({
      name: "Ladoo",
      category: "traditional",
      price: 10,
      quantity: 100,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Ladoo");
    expect(res.body).toHaveProperty("category", "traditional");
    expect(res.body).toHaveProperty("price", 10);
    expect(res.body).toHaveProperty("quantity", 100);
  });
});
