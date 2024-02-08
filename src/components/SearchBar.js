import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { postContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { state } = useContext(postContext);
  const [results, setResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  window.addEventListener("click", (e) => {
    if (
      e.target.className !== "result-title" ||
      e.target.className !== "result-list-item"
    ) {
      setShowSearchResults(false);
    } else return;
  });

  const handleChange = (e) => {
    const filteredPost = state.data.filter((post) => {
      return (
        e.target.value && post.title.toLowerCase().includes(e.target.value)
      );
    });
    setResults(filteredPost);
    setShowSearchResults(true);
  };

  const handleClick = () => {};

  const handleList = (postId, post) => {
    // console.log(postId);
    setShowSearchResults(false);
    navigate(`/user/postPage/${postId}`, { state: { card: post } });
  };
  return (
    <div className="searchBar">
      <input type="text" placeholder="Search" onChange={handleChange} />
      <button onClick={handleClick}>
        <IoSearch />
      </button>
      {showSearchResults && results.length > 0 ? (
        <div className="results-list">
          {results.map((post) => (
            <div
              key={post._id}
              className="result-list-item"
              onClick={() => {
                handleList(post._id, post);
              }}
            >
              <p className="result-title">{post.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
        // <div className="results-list">No results Found</div>
      )}
    </div>
  );
};

export default SearchBar;
