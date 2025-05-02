import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./modules/Home";
import ViewCart from "./modules/ViewCart";
import CreateProduct from "./modules/CreateProduct";
import "./App.css"; // Assuming you're applying the global styles here

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>My E-Commerce Application</h1>
          <nav>
            <ul className="nav-links">
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/viewcart">View Cart</NavLink></li>
              <li><NavLink to="/create-product">Create Product</NavLink></li>
            </ul>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewcart" element={<ViewCart />} />
            <Route path="/create-product" element={<CreateProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;