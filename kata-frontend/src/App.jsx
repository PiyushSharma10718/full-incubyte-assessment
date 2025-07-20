import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddSweet from "./pages/AddSweet";
import ViewSweets from "./pages/ViewSweets";
import SearchSweets from "./pages/SearchSweets";
import PurchaseSweet from "./pages/PurchaseSweet";
import RestockSweet from "./pages/RestockSweet";
import SortSweets from "./pages/SortSweets";
import DeleteSweetPage from "./pages/DeleteSweetPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddSweet />} />
        <Route path="/view" element={<ViewSweets />} />
        <Route path="/search" element={<SearchSweets />} />
        <Route path="/sort" element={<SortSweets />} />
        <Route path="/purchase" element={<PurchaseSweet />} />
        <Route path="/restock" element={<RestockSweet />} />
        <Route path="/delete" element={<DeleteSweetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
