import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/header";
import SideBar from "./Components/SideBar/siderBar";
import Layout from "./Components/Layout/Layout";
import OrderFormPage from "./Pages/OrderFormPage/OrderFormPage";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <main>
          <SideBar />
          <div style={{ flex: 1, padding: "1rem" }}>
            <Routes element={Layout}>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<OrderFormPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
