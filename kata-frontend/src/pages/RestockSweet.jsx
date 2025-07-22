import { useState, useEffect } from "react";
import api from "../services/api";

const RestockSweet = () => {
  const [sweets, setSweets] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/api/sweets");
        setSweets(res.data);
      } catch (err) {
        setMessage("❌ Failed to fetch sweets.");
        console.error("Error fetching sweets:", err);
      }
    };
    fetchSweets();
  }, []);

  const handleRestock = async (e) => {
    e.preventDefault();
    if (!selectedId || quantity < 1) {
      setMessage("❌ Please select a sweet and quantity.");
      return;
    }

    try {
      const res = await api.post(`/api/sweets/restock`, {
        id: selectedId,
        quantity: Number(quantity),
      });

      const updatedSweet = res.data.updatedSweet;
      // setMessage(`✅ Restocked ${quantity} of ${res.data.name}`);

      //     setSweets((prev) =>
      //       prev.map((sweet) =>
      //         sweet._id === parseInt(selectedId)
      //     ? { ...sweet, quantity: res.data.updatedSweet.quantity }
      //     : sweet
      //   )
      // );

      // ✅ Update the sweets state with new quantity
      setSweets((prevSweets) =>
        prevSweets.map((s) =>
          s._id === updatedSweet._id
            ? { ...s, quantity: updatedSweet.quantity }
            : s
        )
      );
      setMessage(
        `✅ Restocked ${quantity} of ${
          res.data.updatedSweet.name.charAt(0).toUpperCase() +
          res.data.updatedSweet.name.slice(1).toLowerCase()
        }. New Stock: ${res.data.updatedSweet.quantity}`
      );

      setQuantity(1);
      setSelectedId("");
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || "Restock failed"}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        🔄 Restock Sweet
      </h2>

      <form onSubmit={handleRestock} className="space-y-4">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Select Sweet</option>
          {sweets.map((sweet) => (
            <option key={sweet._id} value={sweet._id}>
              {/* <h3 className="text-xl font-semibold text-blue-800"> */}
              {sweet.name.charAt(0).toUpperCase() +
                sweet.name.slice(1).toLowerCase()}
              {/* </h3> */}
              (Current Stock: {sweet.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          placeholder="Quantity to restock"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Restock
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg">{message}</p>}
    </div>
  );
};

export default RestockSweet;
