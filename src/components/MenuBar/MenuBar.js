import "./menubar.scss";
import menuData from "./menuData.js";
import logo from "../../images/vite.JPG";
import { useState } from "react";
import { FaHome, FaCog, FaBook } from "react-icons/fa";

const MenuBar = ({setCurrentPage}) => {
  const [itemActive] = useState("Home");

  return (
    <div className="menuBar">
      <ul>
        <li id="showLogo">
          <a href="_blank">
            <img alt="logo" id="logo" src={logo} />
          </a>
        </li>
        {menuData.map((item) => {
          const { name } = item;
          return (
            <li key={name} onClick={()=>setCurrentPage(item)} className="">
              <a
                //href="_blank"
                className={itemActive === name ? "itemActive" : "itemDisabled"}
              >
                {item.image === "fa fa-cog" ? (
                  <FaCog size={'1.5rem'} />
                ) : item.image === "fa fa-chart" ? (
                  <FaBook size={'1.5rem'} />
                ) : (
                  <FaHome size={'1.5rem'} />
                )}{" "}
                <br />
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default MenuBar;
