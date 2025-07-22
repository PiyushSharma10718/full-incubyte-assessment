// import { useEffect, useState } from "react";
// import api from "../services/api";

// const DeleteSweetPage = () => {
//   const [sweets, setSweets] = useState([]);
//   const [message, setMessage] = useState("");

//   const fetchSweets = async () => {
//     try {
//       const res = await api.get("/sweets");
//       setSweets(res.data);
//     } catch (err) {
//       console.error("Failed to fetch sweets:", err);
//       setMessage("❌ Error loading sweets");
//     }
//   };

//   useEffect(() => {
//     fetchSweets();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this sweet?");
//     if (!confirm) return;

//     try {
//       await api.delete(`/sweets/${id}`);
//       setSweets((prev) => prev.filter((s) => s._id !== id));
//       setMessage("✅ Sweet deleted successfully!");
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setMessage("❌ Failed to delete sweet.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
//         🗑️ Delete Sweet
//       </h2>

//       {message && <p className="text-center mb-4 text-lg">{message}</p>}

//       <ul className="space-y-3">
//         {sweets.map((sweet) => (
//           <li
//             key={sweet._id}
//             className="flex justify-between items-center border px-4 py-2 rounded shadow-sm"
//           >
//             <span>
//               {sweet.name.charAt(0).toUpperCase() + sweet.name.slice(1).toLowerCase()} ({sweet.quantity})
//             </span>
//             <button
//               onClick={() => handleDelete(sweet._id)}
//               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DeleteSweetPage;

import { useEffect, useState } from "react";
import api from "../services/api";

const DeleteSweetPage = () => {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // 🔄 Fetch sweets from backend
  const fetchSweets = async () => {
    try {
      const res = await api.get("/api/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to fetch sweets:", err);
      setMessage("❌ Error loading sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // 🧹 Handle delete
  //   const handleDelete = async (id) => {
  //     const confirm = window.confirm(
  //       "Are you sure you want to delete this sweet?"
  //     );
  //     if (!confirm) return;

  //     try {
  //       await api.delete(`/sweets/${id}`);
  //       setSweets((prev) => prev.filter((s) => s._id !== id));
  //       setMessage("✅ Sweet deleted successfully!");
  //     } catch (err) {
  //       console.error("Delete failed:", err);
  //       setMessage("❌ Failed to delete sweet.");
  //     }
  //   };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this sweet?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/api/sweets/${id}`);
      setSweets((prev) => prev.filter((s) => s._id !== id));
      setMessage("✅ Sweet deleted successfully!");
      setSearchTerm(""); // ✅ Clear the search field
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("❌ Failed to delete sweet.");
    }
  };

  // 🔍 Filter sweets live
  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-red-700 mb-4">
        🗑️ Live Search & Delete Sweet
      </h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search sweet by name..."
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
      />

      {message && <p className="text-center mb-4 text-lg">{message}</p>}

      {filteredSweets.length === 0 ? (
        <p className="text-center text-gray-500">No sweets found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredSweets.map((sweet) => (
            <li
              key={sweet._id}
              className="flex justify-between items-center border px-4 py-2 rounded shadow-sm"
            >
              <span>
                🍬{" "}
                {sweet.name.charAt(0).toUpperCase() +
                  sweet.name.slice(1).toLowerCase()}{" "}
                (
                {sweet.category.charAt(0).toUpperCase() +
                  sweet.category.slice(1).toLowerCase()}
                {", "}
                {sweet.quantity})
              </span>
              <button
                onClick={() => handleDelete(sweet._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteSweetPage;
