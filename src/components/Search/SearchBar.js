import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { postContext } from "../../context/globalContext";

const SearchBar = () => {
  const { state } = useContext(postContext);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  // console.log(state);
  const handleChange = (e) => {
    const filteredPost = state.data.filter((post) => {
      return (
        e.target.value && post.title.toLowerCase().includes(e.target.value)
      );
    });
    setResults(filteredPost);
    // console.log(results);
  };
  const handleClick = (e) => {
    setShowResults(true);
  };
  return (
    <div className="searchBar" style={{ position: "relative"}}>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      <div className="select" 
      style={{ display: showResults ? "" : "none" }}
      >
        {results.length === 0 ? (
          <div>No Post</div>
        ) : (
          results.map((data, index) => <div key={index}>{data.title}</div>)
        )}
      </div>
      <button onClick={handleClick}>
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchBar;
