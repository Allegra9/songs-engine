import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const SearchForm = ({ handleSubmit, handleInputChange, searchQuery }) => {
  return (
    <form onSubmit={handleSubmit}>
      <SearchIcon style={{ color: "#181bed", paddingBottom: 0 }} />
      <input
        type="text"
        placeholder="Type a name of a song..."
        onChange={handleInputChange}
        value={searchQuery}
        name="searchQuery"
        autoFocus
      />
      <button type="submit" style={{ cursor: "pointer" }}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
