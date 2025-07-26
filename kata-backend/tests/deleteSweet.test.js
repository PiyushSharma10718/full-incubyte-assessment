// ------------------------------------------------------- finding the first sweet and deleteing the sweet from the db! ----------------------------------------------------------
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Sweet = require("../models/Sweet"); // Adjust path if needed
require("dotenv").config();
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("DELETE /api/sweets/:id", () => {
  it("should delete the first sweet from DB", async () => {
    const sweetToDelete = await Sweet.findOne(); // get first sweet from DB

    if (!sweetToDelete) {
      throw new Error("❌ No sweet found in DB to delete. Add one manually.");
    }
    const deleteRes = await request(app).delete(
      `/api/sweets/${sweetToDelete._id}`
    );
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body).toHaveProperty(
      "message",
      "Sweet deleted successfully"
    );
    expect(deleteRes.body).toHaveProperty(
      "deletedId",
      sweetToDelete._id.toString()
    );
  });
  it("should return 404 for invalid sweet ID", async () => {
    const res = await request(app).delete(
      "/api/sweets/64e9f2c2c2c2c2c2c2c2c2c2"
    ); // fake ID
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Sweet not found");
  });
});

// -------------------------------------------------------- Just passing the test qithout deleteing the actual sweet from the DB -----------------------------------------------------------
// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../app");
// require("dotenv").config(); // Load environment variables

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("DELETE /api/sweets/:id", () => {
//   it("should delete a sweet by ID", async () => {
//     // Add a sweet to be deleted
//     const addRes = await request(app).post("/api/sweets").send({
//       name: "Ladoo",
//       category: "traditional", // ✅ required field in schema
//       price: 10,
//       quantity: 100,
//     });

//     const sweetId = addRes.body._id; // ✅ correct: MongoDB returns _id

//     const deleteRes = await request(app).delete(`/api/sweets/${sweetId}`);

//     expect(deleteRes.statusCode).toBe(200);
//     expect(deleteRes.body).toHaveProperty(
//       "message",
//       "Sweet deleted successfully"
//     );
//   });

//   it("should return 404 for invalid sweet ID", async () => {
//     const res = await request(app).delete(
//       "/api/sweets/64e9f2c2c2c2c2c2c2c2c2c2"
//     ); // valid format but likely doesn't exist
//     expect(res.statusCode).toBe(404);
//     expect(res.body).toHaveProperty("error", "Sweet not found");
//   });
// });

// ---------------------------------------------------------- Add a sweet and then delete it ! -------------------------------------------------------------
// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../app");
// require("dotenv").config(); // Load environment variables

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("DELETE /api/sweets/:id", () => {
//   it("should delete a sweet by ID", async () => {
//     // Add a sweet to be deleted
//     const addRes = await request(app).post("/api/sweets").send({
//       name: "Ladoo",
//       category: "traditional", // required in your schema
//       price: 10,
//       quantity: 100,
//     });

//     const sweetId = addRes.body._id;

//     // Now delete that sweet
//     const deleteRes = await request(app).delete(`/api/sweets/${sweetId}`);

//     expect(deleteRes.statusCode).toBe(200);
//     expect(deleteRes.body).toHaveProperty(
//       "message",
//       "Sweet deleted successfully"
//     );
//     expect(deleteRes.body).toHaveProperty("deletedId", sweetId);
//   });

//   it("should return 404 for invalid sweet ID", async () => {
//     // Fake valid MongoDB ObjectId (24 chars) that doesn’t exist
//     const res = await request(app).delete(
//       "/api/sweets/64e9f2c2c2c2c2c2c2c2c2c2"
//     );
//     expect(res.statusCode).toBe(404);
//     expect(res.body).toHaveProperty("error", "Sweet not found");
//   });
// });
