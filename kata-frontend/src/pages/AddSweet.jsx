import React, { useState } from "react";
import api from "../services/api";

const AddSweet = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await api.post("/sweets", formData);
  //     setMessage("✅ Sweet added successfully!");
  //     setFormData({ name: "", category: "", price: "", quantity: "" });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     setMessage("❌ Failed to add sweet. Check inputs.");
  //   }
  // };

  const allowedCategories = [
    "dessert",
    "dryfruit",
    "traditional",
    "candy",
    "chocolate",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = formData.category.toLowerCase();

    if (!allowedCategories.includes(category)) {
      setMessage(
        "❌ Invalid category. Must be one of: dessert, dryfruit, traditional, candy, chocolate."
      );
      return;
    }

    // Convert desired fields to lowercase
    const preparedData = {
      ...formData,
      name: formData.name.toLowerCase(),
      category: formData.category.toLowerCase(),
    };

    try {
      const res = await api.post("/sweets", preparedData);
      setMessage("✅ Sweet added successfully!");
      setFormData({ name: "", category: "", price: "", quantity: "" });
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add sweet. Check inputs.", err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Sweet</h2>
      {message && (
        <div className="text-sm text-center mb-4 font-semibold text-green-600">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "price", "quantity"].map((field) => (
          // <input
          //   key={field}
          //   name={field}
          //   type={field === "price" || field === "quantity" ? "number" : "text"}
          //   value={formData[field]}
          //   onChange={handleChange}
          //   placeholder={`Enter ${field}`}
          //   className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          //   required
          // />
          <input
            key={field}
            // type="number"
            type={field === "price" || field === "quantity" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            min={field === "price" ? 1 : field === "quantity" ? 1 : undefined}
            max={
              field === "price"
                ? 10000000
                : field === "quantity"
                ? 10000
                : undefined
            }
            step="1" // 🔒 Prevent fractional numbers
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
};

export default AddSweet;
