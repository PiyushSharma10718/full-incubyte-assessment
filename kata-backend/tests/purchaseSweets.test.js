const mongoose = require("mongoose");
const Sweet = require("../models/Sweet"); // Adjust if path differs
require("dotenv").config();

beforeAll(async () => {
  // Connect to MongoDB Atlas
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Decrease sweet quantity by 10", () => {
  it("should find the first sweet and Decrease its quantity by 10", async () => {
    const sweet = await Sweet.findOne();

    if (!sweet) {
      throw new Error("❌ No sweet found in DB to update.");
    }

    const originalQuantity = sweet.quantity;
    sweet.quantity -= 10;
    await sweet.save(); // ✅ Persist the change

    const updatedSweet = await Sweet.findById(sweet._id);

    expect(updatedSweet.quantity).toBe(originalQuantity - 10);
    console.log(
      `✅ Quantity of '${sweet.name}' Decreased from ${originalQuantity} to ${updatedSweet.quantity}`
    );
  });
});
