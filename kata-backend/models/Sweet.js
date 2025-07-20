// backend/models/Sweet.js
const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["dessert", "candy", "chocolate", "dryfruit", "traditional"],
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 10000000,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
});

module.exports = mongoose.model("Sweet", sweetSchema);

// import mongoose from 'mongoose';

// const sweetSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, enum: ['chocolate', 'candy', 'pastry'], required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true }
// }, { timestamps: true });

// const Sweet = mongoose.model('Sweet', sweetSchema);
// export default Sweet;
