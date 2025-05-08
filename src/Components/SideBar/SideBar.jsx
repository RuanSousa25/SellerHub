import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import SideBarLink from "./SideBarLink";

import { LuBox } from "react-icons/lu";
import { GoGear } from "react-icons/go";

export default function SideBar() {
  return (
    <nav className="side-bar">
      <SideBarLink Icon={LuBox} path={"/SellerHub/logistics"}>
        Logística
      </SideBarLink>
      <SideBarLink Icon={GoGear} path={"/SellerHub/orderform"}>
        Configurações de pedidos
      </SideBarLink>
    </nav>
  );
}
