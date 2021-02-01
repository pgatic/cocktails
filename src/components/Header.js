import React from "react";
import { Link } from "react-router-dom";
import { FaCocktail } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useGlobalContext } from "../context";

const Header = () => {
  const {
    refresh,
    fetchSpecific,
    showFavorites,
    favCount,
  } = useGlobalContext();

  return (
    <nav className="flex justify-between bb b--white-10 bg-near-black">
      <Link to="/" className="link" onClick={refresh}>
        <IconContext.Provider
          value={{ color: "#ff6300", size: "2em", className: "pv2 ph3" }}
        >
          <FaCocktail />
        </IconContext.Provider>
      </Link>
      <div className="pv3 flex items-center f6 fw4 ttu">
        <Link
          to="/"
          className="link dib white dim ph2 mr4-ns"
          onClick={fetchSpecific}
        >
          Alcoholic
        </Link>
        <Link
          to="/"
          className="link dib white dim ph2 mr4-ns"
          onClick={fetchSpecific}
        >
          Non Alcoholic
        </Link>
      </div>
      <Link
        to="/"
        className="link flex items-center justify-center"
        onClick={showFavorites}
      >
        <IconContext.Provider
          value={{ color: "red", size: "2em", className: "pv2 pl2 pr3" }}
        >
          <span className="gray f4">{favCount}</span>
          <FiHeart />
        </IconContext.Provider>
      </Link>
    </nav>
  );
};

export default Header;
