// import React, { useState, useEffect } from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Toolbar from "../Toolbar/Toolbar";
import Title from "../Title/Title";

export default function Header() {
  /*const [headerUp, setheaderUp] = useState(
    window.innerWidth < 800 ? false : true
  );

  const renderPoint = () => {
    if (window.innerWidth < 800) setheaderUp(false);
    else setheaderUp(true);
  };

  useEffect(() => {
    renderPoint();
    window.addEventListener("resize", renderPoint);
    return () => window.removeEventListener("resize", renderPoint);
  }, []);
*/
  return (
    <div className="general-header">
      <Navbar />
      <Title />
      <Search />
      <Toolbar />
    </div>
  );
}
