import React from "react";
import CocktailList from "../components/CocktailList";
import Search from "../components/Search";

export default function Home() {
  return (
    <main>
      <Search />
      <CocktailList />
    </main>
  );
}
