// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/">
        <h1 className="text-xl font-bold">🍭 Sweet Shop</h1>
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Add
        </Link>
        <Link to="/view" className="hover:underline">
          View
        </Link>
        <Link to="/search" className="hover:underline">
          Search
        </Link>
        <Link to="/sort" className="hover:underline">
          Sort
        </Link>
        <Link to="/purchase" className="hover:underline">
          Purchase
        </Link>
        <Link to="/restock" className="hover:underline">
          Restock
        </Link>
        <Link to="/delete" className="hover:underline">
          Delete
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
