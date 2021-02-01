import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ image, name, id, info }) => {
  const color = info === "Alcoholic" ? "dark-red" : "green";

  return (
    <div className="fl w-50 w-33-ns w-25-l w-20-xl pa2">
      <Link
        to={`/cocktail/${id}`}
        className="db link dim tc ba b--white-40 br3 shadow-4 overflow-hidden"
      >
        <h2 className={`f7 white tr pr2 mv0 bg-${color}`}>{info}</h2>
        <img src={image === null ? "" : image} alt={name} />
        <div className="w-100 pt1 pb2 bg-dark-gray o-80">
          <h2 className="f6 f5-ns mv0 h2 light-gray">{name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Cocktail;
