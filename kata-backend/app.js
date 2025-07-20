const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// const connectDB = require("./db");
// connectDB();

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

// app.post("/api/sweets/purchase", async (req, res) => {
//   const { id, quantity } = req.body;

//   if (!id || !quantity || quantity <= 0) {
//     return res.status(400).json({ error: "Invalid request body" });
//   }

//   const sweets = await Sweet.find();
//   if (!sweets) {
//     return res.status(404).json({ error: "Sweet not found" });
//   }

//   if (sweets.quantity < quantity) {
//     return res.status(400).json({ error: "Not enough stock available" });
//   }

//   sweets.quantity -= quantity;

//   res.status(200).json({
//     message: "Purchase successful",
//     updatedSweet: sweets,
//   });
// });

// app.delete("/api/sweets/:id", async (req, res) => {
//   try {
//     const result = await Sweet.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.status(404).json({ error: "Sweet not found" });
//     }
//     res.json({ message: "Sweet deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete sweet" });
//   }
// });

// app.post("/api/sweets/purchase", async (req, res) => {
//   const { id, quantity } = req.body;

//   if (!id || !quantity || quantity <= 0) {
//     return res.status(400).json({ error: "Invalid purchase request" });
//   }

//   try {
//     const sweet = await Sweet.findById(id);
//     if (!sweet) return res.status(404).json({ error: "Sweet not found" });

//     if (sweet.quantity < quantity) {
//       return res.status(400).json({ error: "Not enough stock" });
//     }

//     sweet.quantity -= quantity;
//     await sweet.save();

//     res.status(200).json({ message: "Purchase successful", updatedSweet: sweet });
//   } catch (err) {
//     res.status(500).json({ error: "Purchase failed" });
//   }
// });

// app.post("/api/sweets/restock", async (req, res) => {
//   const { id, quantity } = req.body;

//   if (!id || !quantity || quantity <= 0) {
//     return res.status(400).json({ error: "Invalid restock quantity" });
//   }

//   try {
//     const sweet = await Sweet.findById(id);
//     if (!sweet) return res.status(404).json({ error: "Sweet not found" });

//     sweet.quantity += quantity;
//     await sweet.save();

//     res.status(200).json({ message: "Restock successful", updatedSweet: sweet });
//   } catch (err) {
//     res.status(500).json({ error: "Restock failed" });
//   }
// });

// app.post("/api/sweets", async (req, res) => {
//   const { name, category, price, quantity } = req.body;
//   if (!name || !price || !quantity) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   try {
//     const newSweet = new Sweet({ name, category, price, quantity });
//     await newSweet.save();
//     res.status(201).json(newSweet);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add sweet" });
//   }
// });

// ✅ Shared sweets array
// const sweets = [];
// app.locals.sweets = sweets; // ✅ Expose to test via app.locals

// // ✅ POST route
// app.post("/api/sweets", (req, res) => {
//   const { name, category, price, quantity } = req.body;
//   if (!name || price === undefined || quantity === undefined) {
//     return res.status(400).json({ error: "Missing fields" });
//   }
//   const sweet = { id: sweets.length + 1, name, category, price, quantity };
//   sweets.push(sweet);
//   res.status(201).json(sweet);
// });

// ✅ DELETE route
// app.delete("/api/sweets/:id", (req, res) => {
//   const sweetId = parseInt(req.params.id);
//   const index = sweets.findIndex((sweet) => sweet.id === sweetId);
//   if (index === -1) {
//     return res.status(404).json({ error: "Sweet not found" });
//   }
//   sweets.splice(index, 1);
//   res.status(200).json({ message: "Sweet deleted" });
// });

// ✅ VIEW all sweets
// app.get("/api/sweets", (req, res) => {
//   res.status(200).json(sweets);
// });

// app.get("/api/sweets", (req, res) => {
//   res.json(sweets); // returns all available sweets
// });

module.exports = app;
