import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/header";
import SideBar from "./Components/SideBar/SideBar";
import Layout from "./Components/Layout/Layout";
import OrderFormPage from "./Pages/OrderFormPage/OrderFormPage";
import { AuthProvider } from "./Context/AuthContext";
import DockPage from "./Pages/DockPage/DockPage";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="App">
          <Header />
          <main>
            <SideBar />
            <div style={{ flex: 1, padding: "1rem" }}>
              <Routes element={Layout}>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/orderform" element={<OrderFormPage />} />
                <Route path="/logistics" element={<DockPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
