import React, { useState, useEffect, useContext, useCallback } from "react";
import generateRandomLetter from "./utils";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const getSavedCocktails = () => {
  let saved = localStorage.getItem("favorites");
  if (saved) {
    return JSON.parse(saved);
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(generateRandomLetter());
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState(getSavedCocktails());

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic } = item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  const refresh = () => {
    setSearchTerm(generateRandomLetter());
  };

  const addToFavorites = (c) => {
    setFavorites([...favorites, c]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const favCount = favorites.length;

  const fetchSpecific = async (e) => {
    const specific = e.target.innerText;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${specific}`
      );
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: specific,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const showFavorites = () => {
    setCocktails(favorites);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        searchTerm,
        favCount,
        setSearchTerm,
        fetchDrinks,
        refresh,
        fetchSpecific,
        showFavorites,
        addToFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
