// src/pages/ViewSweets.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

const ViewSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/sweets");
        setSweets(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch sweets", err);
        setLoading(false);
      }
    };

    fetchSweets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🍭 All Available Sweets
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : sweets.length === 0 ? (
        <div className="text-center text-gray-500">No sweets available.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sweets.map((sweet) => (
            <div
              key={sweet.id || sweet._id}
              className="bg-white shadow-md p-4 rounded-xl border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-blue-800">
                  {sweet.name.charAt(0).toUpperCase() +
                    sweet.name.slice(1).toLowerCase()}
              </h3>
              <p className="text-sm text-gray-600">
                Category:{" "}
                {sweet.category.charAt(0).toUpperCase() +
                  sweet.category.slice(1).toLowerCase()}
              </p>
              <p className="text-sm">💰 Price: ₹{sweet.price}</p>
              <p className="text-sm">📦 Stock: {sweet.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSweets;
