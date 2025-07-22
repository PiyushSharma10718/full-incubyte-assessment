const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const Sweet = require("./models/Sweet");

// ✅ CREATE a new sweet
app.post("/api/sweets", async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newSweet = new Sweet({ name, category, price, quantity });
    const saved = await newSweet.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save sweet" });
  }
});

// ✅ VIEW all sweets
app.get("/api/sweets", async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
});

// ✅ SEARCH sweets
app.get("/api/sweets/search", async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  try {
    let sweets = await Sweet.find(); // ✅ Get all sweets from DB

    if (name) {
      sweets = sweets.filter((sweet) =>
        sweet.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (category) {
      sweets = sweets.filter(
        (sweet) =>
          sweet.category &&
          sweet.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice || maxPrice) {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      sweets = sweets.filter(
        (sweet) => sweet.price >= min && sweet.price <= max
      );
    }

    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: "Failed to search sweets" });
  }
});

// ✅ SORT sweets
app.get("/api/sweets/sort", async (req, res) => {
  const { field = "name", order = "asc" } = req.query;
  const sweets = await Sweet.find();

  const sorted = [...sweets].sort((a, b) => {
    if (field === "price" || field === "quantity") {
      return order === "asc" ? a[field] - b[field] : b[field] - a[field];
    } else {
      const valA = (a[field] || "").toLowerCase();
      const valB = (b[field] || "").toLowerCase();
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    }
  });

  res.status(200).json(sorted);
});

// ✅ PURCHASE a sweet
app.post("/api/sweets/purchase", async (req, res) => {
  const { id, quantity } = req.body;

  if (!id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid Product" });
  }

  try {
    // ✅ Find the specific sweet by ID
    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // ✅ Deduct quantity and save
    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({
      message: "Purchase successful",
      updatedSweet: sweet,
    });
  } catch (err) {
    console.error("Error in purchase:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ RESTOCK a sweet
app.post("/api/sweets/restock", async (req, res) => {
  const { id, quantity } = req.body;

  if (!id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid restock quantity" });
  }
  try {
    // const sweet = sweets.find((s) => s.id === parseInt(id));
    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    sweet.quantity = Number(sweet.quantity) + Number(quantity);
    await sweet.save();

    res.status(200).json({
      message: "Restock successful",
      updatedSweet: sweet,
    });
  } catch (err) {
    console.error("Error in restock:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ DELETE a sweet by ID
app.delete("/api/sweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }
    res
      .status(200)
      .json({ message: "Sweet deleted successfully", deletedId: id });
  } catch (err) {
    console.error("Error deleting sweet:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
