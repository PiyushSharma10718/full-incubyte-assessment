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

describe("Increase sweet quantity by 100", () => {
  it("should find the first sweet and increase its quantity by 100", async () => {
    const sweet = await Sweet.findOne();

    if (!sweet) {
      throw new Error("❌ No sweet found in DB to update.");
    }

    const originalQuantity = sweet.quantity;
    sweet.quantity += 100;
    await sweet.save(); // ✅ Persist the change

    const updatedSweet = await Sweet.findById(sweet._id);

    expect(updatedSweet.quantity).toBe(originalQuantity + 100);
    console.log(
      `✅ Quantity of '${sweet.name}' Increased from ${originalQuantity} to ${updatedSweet.quantity}`
    );
  });
});
