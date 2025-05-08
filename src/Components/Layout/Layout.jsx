import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "../Header/header";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "../../Context/AuthContext";
export default function Layout() {
  const { authLoading } = useAuth();
  return (
    <div className="App">
      <Header />
      <main style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "1rem" }}>
          {authLoading ? <p>Carregando</p> : <Outlet />}
        </div>
      </main>
    </div>
  );
}
