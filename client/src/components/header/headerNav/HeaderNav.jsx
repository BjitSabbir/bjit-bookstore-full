/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import "./headerNav.scss";
export default function HeaderNav({ text, link, icon, bold, type }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? type !== "s"
            ? "navLink navLink-active"
            : "navLink"
          : "navLink"
      }
      to={link}
    >
      {icon && <span className={"span-container"}>{icon}</span>}
      {text && (
        <span
          style={{
            fontSize: type == "s" ? "16px" : "20px",
            color: type == "s" && "#30223b",
          }}
          className={bold ? "span-container bold" : "span-container"}
        >
          {text}
        </span>
      )}
    </NavLink>
  );
}
