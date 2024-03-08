import { url } from "../App";
import React, {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { postContext } from "../context/globalContext.js";
import Loader from "./Loader.js";

//lazy loading
const Blog = lazy(() => import("./Blog.js"));
const PaginationComp = lazy(() => import("./PaginationComp.js"));

function Dashboard() {
  const { state, dispatch } = useContext(postContext);
  const [page, setPage] = useState(1);
  const [savedBlogs, setSavedBlogs] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSavedBlogs();
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

  const fetchSavedBlogs = async () => {
    const res = await axios.get(`${url}/blogs/savedPosts?populate=false`, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setSavedBlogs(res.data.data);
  };

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
            state.data.slice(page * 10 - 10, page * 10).map((card) => (
              <Suspense fallback={<Loader />} key={card._id}>
                <Blog
                  blog={card}
                  savedBlogs={savedBlogs}
                  setSavedBlogs={setSavedBlogs}
                />
              </Suspense>
            ))
          )}
        </div>
      </Container>
      <div className="d-flex align-items-lg-center justify-content-center mt-5">
        {state.data.length > 0 && (
          <Suspense fallback={<Loader />}>
            <PaginationComp
              page={page}
              setPage={setPage}
              length={state.data.length / 10}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
