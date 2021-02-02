import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { FaTwitter, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useGlobalContext } from "../context";
import { Helmet } from "react-helmet";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);
  const { addToFavorites } = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
            strMeasure6,
            strMeasure7,
            strMeasure8,
            strMeasure9,
          } = data.drinks[0];
          const ingredientsTemp = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
          ];
          const mesurements = [
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
            strMeasure6,
            strMeasure7,
            strMeasure8,
            strMeasure9,
          ];
          const ingredients = ingredientsTemp
            .filter((item) => item !== null && item !== "")
            .map((item, i) => {
              return mesurements[i] + " of " + item;
            });
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
          // console.log(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2>no such cocktail!</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail;

    return (
      <article className="flex flex-wrap justify-center">
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={window.location.href} />
          <meta name="twitter:title" content="Pick and shake" />
          <meta name="twitter:description" content="Cocktails" />
          <meta name="twitter:image" content={image} />
        </Helmet>
        <div className="w-100 w-50-l mw6 pa3">
          <h1 className="baskerville f2 gray tc">{name}</h1>
          <img src={image} className="w-100 br3" alt={name} />
        </div>
        <div className="w-100 w-50-l mw6 pa3 flex flex-column">
          <div className="f5 pt6-l pl4-l">
            <dl className="flex items-center lh-title mv2">
              <dt className="dib w-30">
                <span className="bg-light-gray fw4 br1 ph1 o-60 fr mr3">
                  Category:
                </span>
              </dt>
              <dd className="dib w-70 ml2 i fw6 light-gray lh-copy">
                {category}
              </dd>
            </dl>
            <dl className="flex items-center lh-title mv2">
              <dt className="dib w-30">
                <span className="bg-light-gray fw4 br1 ph1 o-60 fr mr3">
                  Info:
                </span>
              </dt>
              <dd className="dib w-70 ml2 i fw6 light-gray lh-copy">{info}</dd>
            </dl>
            <dl className="flex items-center lh-title mv2">
              <dt className="dib w-30">
                <span className="bg-light-gray fw4 br1 ph1 o-60 fr mr3">
                  Glass:
                </span>
              </dt>
              <dd className="dib w-70 ml2 i fw6 light-gray lh-copy">{glass}</dd>
            </dl>
            <dl className="flex items-center lh-title mv2">
              <dt className="dib w-30">
                <span className="bg-light-gray fw4 br1 ph1 o-60 fr mr3">
                  Ingredients:
                </span>
              </dt>
              <dd className="dib w-70 ml2 i fw6 light-gray">
                <ul className="list pa0 mv0">
                  {ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </dd>
            </dl>
            <dl className="flex items-center lh-title mv2">
              <dt className="dib w-30">
                <span className="bg-light-gray fw4 br1 ph1 o-60 fr mr3">
                  Instructions:
                </span>
              </dt>
              <dd className="dib w-70 ml2 fw6 light-gray i lh-copy">
                {instructions}
              </dd>
            </dl>
          </div>
          <div className="mt5 flex items-center justify-around">
            <IconContext.Provider
              value={{
                size: "2em",
                className: "pv2 ph3 blue dim pointer",
              }}
            >
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                className="twitter-share-button"
                target="_blank"
              >
                <FaTwitter />
              </a>
            </IconContext.Provider>

            <Link to="/" className="link grow b br2 ph3 pv2 black bg-orange">
              Go Back
            </Link>
            <IconContext.Provider
              value={{
                color: "red",
                size: "2em",
                className: "pv2 ph3 dim pointer",
              }}
            >
              <FaHeart
                onClick={() => addToFavorites({ id, name, image, info })}
              />
            </IconContext.Provider>
          </div>
        </div>
      </article>
    );
  }
};

export default SingleCocktail;
