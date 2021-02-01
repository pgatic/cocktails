import React, { useRef } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef("");

  function searchCocktail() {
    setSearchTerm(searchValue.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  // useEffect(() => {
  //   return searchValue.current.focus();
  // });

  return (
    <form className="pa3 black-80 mw7 pt4 center" onSubmit={handleSubmit}>
      <div className="measure center">
        <input
          id="name"
          className="input-reset ba b--gray-20 bg-dark-gray light-gray pa2 pl3 mb2 db w-100"
          type="text"
          placeholder="Search cocktails"
          aria-describedby="name-desc"
          ref={searchValue}
          onChange={searchCocktail}
        />
      </div>
    </form>
  );
};

export default Search;
