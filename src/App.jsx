import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/header";
import SideBar from "./Components/SideBar/SideBar";
import Layout from "./Components/Layout/Layout";
import OrderFormPage from "./Pages/OrderFormPage/OrderFormPage";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import DockPage from "./Pages/DockPage/DockPage";
import AuthPage from "./Pages/AuthPage/AuthPage";

function App() {
  const { loading } = useAuth();
  return (
    <div className="App">
      {loading ? (
        <p>carregando...</p>
      ) : (
        <Routes>
          <Route path="SellerHub/*" element={<Layout />}>
            <Route path="" element={<AuthPage />} />
            <Route path="orderform" element={<OrderFormPage />} />
            <Route path="logistics" element={<DockPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
