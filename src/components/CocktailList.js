import React from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Cocktail from "./Cocktail";

const CocktailList = () => {
  const { loading, title, cocktails } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (cocktails.length < 1) {
    return <h2 className="tc gray">no cocktails matching your search</h2>;
  }

  return (
    <article className="ph4-m ph6-l ph7-xl">
      <h1 className="baskerville f2 fw4 pa3 tc mv0 gray">
        {title ? title : "Cocktails"}
      </h1>
      <div className="cf pa2">
        {cocktails.map((item, inx) => {
          return <Cocktail key={inx} {...item} />;
        })}
      </div>
    </article>
  );
};

export default CocktailList;
