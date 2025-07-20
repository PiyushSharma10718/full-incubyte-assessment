import { useState, useEffect } from "react";
import api from "../services/api";

const PurchaseSweet = () => {
  const [sweets, setSweets] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/sweets");
        setSweets(res.data);
      } catch (err) {
        setMessage("❌ Failed to fetch sweets.");
        console.error("Error fetching sweets:", err);
      }
    };
    fetchSweets();
  }, []);

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!selectedId || quantity < 1) {
      setMessage("❌ Please select a sweet and quantity.");
      return;
    }

    try {
      const res = await api.post("/sweets/purchase", {
        id: selectedId,
        quantity: Number(quantity),
      });

      const updatedSweet = res.data.updatedSweet;
      // setMessage(`✅ Purchased ${quantity} of ${res.data.updatedSweet.name}`);

      // setSweets((prev) =>
      //   prev.map((s) =>
      //     s._id === parseInt(selectedId)
      //       ? { ...s, quantity: res.data.updatedSweet.quantity }
      //       : s
      //   )
      // );

      // ✅ Update frontend stock
      setSweets((prevSweets) =>
        prevSweets.map((s) =>
          s._id === updatedSweet._id
            ? { ...s, quantity: updatedSweet.quantity }
            : s
        )
      );

      // {sweet.name.charAt(0).toUpperCase() +
      // sweet.name.slice(1).toLowerCase()}

      setMessage(
        `✅ Purchased ${quantity} of ${
          res.data.updatedSweet.name.charAt(0).toUpperCase() +
          res.data.updatedSweet.name.slice(1).toLowerCase()
        }. Remaining stock: ${res.data.updatedSweet.quantity}`
      );

      setQuantity(1);
      setSelectedId("");
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || "Purchase failed"}`);
      // console.log("Selected ID:", selectedId);
      // console.log("Quantity:", quantity);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        🛒 Purchase Sweet
      </h2>

      <form onSubmit={handlePurchase} className="space-y-4">
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
              (Stock: {sweet.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          placeholder="Quantity to purchase"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Purchase
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg">{message}</p>}
    </div>
  );
};

export default PurchaseSweet;
