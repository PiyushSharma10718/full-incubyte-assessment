import { useState, useEffect } from "react";
import api from "../services/api"; // make sure this points to your axios instance

const SortSweets = () => {
  const [field, setField] = useState("name");
  const [order, setOrder] = useState("asc");
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const fetchSortedSweets = async () => {
      try {
        const queryString = new URLSearchParams({ field, order }).toString();
        const res = await api.get(`/sweets/sort?${queryString}`);
        setSweets(res.data);
      } catch (err) {
        console.error("Error fetching sorted sweets:", err);
      }
    };

    fetchSortedSweets();
  }, [field, order]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        📊 Sort Sweets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">Sort by:</label>
          <select
            value={field}
            onChange={(e) => {
              const selectedField = e.target.value;
              setField(selectedField);
              // Set default order
              if (selectedField === "price" || selectedField === "quantity") {
                setOrder("asc");
              } else {
                setOrder("asc");
              }
            }}
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Order:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet.id || sweet._id}
            className="bg-white shadow p-4 rounded-xl"
          >
            <h3 className="text-xl font-bold text-green-800">{sweet.name}</h3>
            <p className="text-sm">Category: {sweet.category}</p>
            <p className="text-sm">Price: ₹{sweet.price}</p>
            <p className="text-sm">Stock: {sweet.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortSweets;
