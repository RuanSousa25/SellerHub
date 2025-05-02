import React from "react";
import "./SideBarLink.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function SideBarLink({ children, Icon, path }) {
  const navigate = useNavigate();

  const redirect = () => navigate(path);
  return (
    <div className="side-bar-link" onClick={redirect}>
      <div className="link-icon-div">
        <Icon />
      </div>
      <p>{children}</p>
      <div className="forward-icon-div">
        <IoIosArrowForward />
      </div>
    </div>
  );
}
