import React, { useContext, useEffect, useState } from "react";
import { postContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { state } = useContext(postContext);
  const [results, setResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      // console.log(e);
      if (
        e.target.className !== "result-title" ||
        e.target.className !== "result-list-item"
      ) {
        setShowSearchResults(false);
      } else return;
    });
    return () => {
      window.removeEventListener("click", (e) => {
        if (
          e.target.className !== "result-title" ||
          e.target.className !== "result-list-item"
        ) {
          setShowSearchResults(false);
        } else return;
      });
    };
  }, []);

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
              {post.title}
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
