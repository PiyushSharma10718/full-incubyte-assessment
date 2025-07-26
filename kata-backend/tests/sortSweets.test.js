const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

beforeAll(async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /api/sweets/sort", () => {
  const fields = ["name", "category", "price", "quantity"];
  const orders = ["asc", "desc"];

  fields.forEach((field) => {
    orders.forEach((order) => {
      it(`should sort sweets by ${field} in ${order} order`, async () => {
        const res = await request(app).get(`/api/sweets/sort?field=${field}&order=${order}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(1);

        // Extract the field values to test sorting
        const values = res.body.map((item) => item[field]);

        // Copy and sort the values to compare
        const sorted = [...values].sort((a, b) => {
          if (typeof a === "string") {
            return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
          } else {
            return order === "asc" ? a - b : b - a;
          }
        });

        expect(values).toEqual(sorted);
        console.log(`✅ ${field.toUpperCase()} sorted in ${order.toUpperCase()} order:`, values);
      });
    });
  });
});
