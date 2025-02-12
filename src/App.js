import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/AppLayout";
import CartPage from "./component/CartPage";
import HomePage from "./component/HomePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
