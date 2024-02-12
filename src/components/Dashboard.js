import { url } from "../App";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillLike } from "react-icons/ai";
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

  const Navigate = useNavigate();

  const handleLike = async (id, userId) => {
    try {
      const post = await state.data.find((post) => post._id === id);
      const index = await post.likes.findIndex((user) => user === userId);
      if (index === -1) {
        await axios
          .post(
            `${url}/blogs/likePost/${id}`,
            {},
            {
              headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              dispatch({
                type: "Like_Post",
                payload: { userId, postId: post._id },
              });
              toast.success("Liked");
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisLike = async (id, userId) => {
    const post = await state.data.find((post) => post._id === id);
    const index = await post.likes.findIndex((user) => user === userId);
    try {
      await axios.post(
        `${url}/blogs/unLikePost/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "DisLike_Post", payload: { index, postId: post._id } });
      toast.error("Disliked");
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "Primary",
      "Secondary",
      "Success",
      "Danger",
      "Warning",
      "Info",
      "Dark",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
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
              <Blog blog={card} key={card._id} />
              // <Card
              //   className="cards"
              //   bg={getRandomColor().toLowerCase()}
              //   key={card._id}
              //   style={{
              //     width: "18rem",
              //     margin: "10px",
              //     boxShadow:
              //       "0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
              //   }}
              //   text={
              //     getRandomColor().toLowerCase() === "light" ? "dark" : "white"
              //   }
              // >
              //   <Card.Body
              //     onClick={() =>
              //       Navigate(`/user/postPage/${card._id}`, {
              //         state: { card: card },
              //       })
              //     }
              //   >
              //     <Card.Title>{card.title}</Card.Title>
              //     <Card.Text>{card.description}</Card.Text>
              //     <Card.Text>{card.content}</Card.Text>
              //   </Card.Body>
              //   <Card.Footer>
              //     <div
              //       style={{ display: "flex", justifyContent: "space-between" }}
              //     >
              //       <div>{new Date(card.createdAt).toLocaleDateString()}</div>
              //       <div style={{ display: "flex", alignItems: "center" }}>
              //         {card.likes.some((userId) => {
              //           return userId == sessionStorage.getItem("userId");
              //         }) ? (
              //           <AiFillLike
              //             style={{ color: "red" }}
              //             onClick={() => {
              //               handleDisLike(
              //                 card._id,
              //                 sessionStorage.getItem("userId")
              //               );
              //             }}
              //           />
              //         ) : (
              //           <AiFillLike
              //             onClick={() => {
              //               handleLike(
              //                 card._id,
              //                 sessionStorage.getItem("userId")
              //               );
              //             }}
              //           />
              //         )}
              //         <span style={{ marginLeft: "5px" }}>
              //           {card.likes.length} Likes
              //         </span>
              //       </div>
              //     </div>
              //   </Card.Footer>
              // </Card>
            ))
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
