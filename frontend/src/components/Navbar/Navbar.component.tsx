import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.contact";
import { useContext, useState } from "react";
const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "candidate" },
];
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState<Boolean>(false);

  const toggleMenuOpen = () => {
    setOpen((preState) => !preState);
  };

  const menuStyle = open ? "menu open" : "menu";
  return (
    <div className="navbarheader">
      <div className="brand">
        <span>Resume Management</span>
      </div>

      <div className={menuStyle}>
        <div className="brand1">
          <span>Resume Management</span>
        </div>
        <ul>
          {links.map((item) => {
            return (
              <li key={item.href} onClick={toggleMenuOpen}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hamggurger">
        <Menu onClick={toggleMenuOpen} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
