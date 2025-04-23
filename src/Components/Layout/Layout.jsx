import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="App">
      <Header />
      <main style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "1rem" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
