import { url } from "../App";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { postContext } from "../context/globalContext.js";
import Loader from "./Loader.js";
import PaginationComp from "./PaginationComp.js";
import Blog from "./Blog.js";

function Dashboard() {
  const { state, dispatch } = useContext(postContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: "Fetching" });
      const res = await axios.get(`${url}/blogs`);
      dispatch({ type: "Fetch_Success", payload: res.data });
    } catch (error) {
      dispatch({ type: "Fetch_Error", payload: error });
      console.log(error);
    }
  }, [state]);

  if (state.loading === true) {
    return <Loader />;
  }

  return (
    <div>
      <Container>
        <div className="d-flex flex-wrap justify-content-center mt-3">
          {state.data.length === 0 ? (
            <h1>No Posts Yet..</h1>
          ) : (
            state.data
              .slice(page * 10 - 10, page * 10)
              .map((card) => <Blog blog={card} key={card._id} />)
          )}
        </div>
      </Container>
      <div className="d-flex align-items-lg-center justify-content-center">
        {state.data.length > 0 && (
          <PaginationComp
            page={page}
            setPage={setPage}
            length={state.data.length / 10}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
