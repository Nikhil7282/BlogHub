import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import { postContext } from "../context/globalContext.js";
import NewNavbar from "./NewNavbar.js";
import Loader from "./Loader.js";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
function Home() {
  const { state } = useContext(postContext);
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [ref1, inView1] = useInView();

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

  return (
    <div
      style={{
        backgroundImage: "url('/stacked-peaks-haikei.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
        overflowY: "scroll",
      }}
    >
      <NewNavbar state="Home" />
      {state.loading ? (
        <Loader />
      ) : (
        <Container
          className="text-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="quotes" ref={ref1}>
            <h1 className={`${inView1 ? "animate--fade-in-right" : "hidden"}`}>
              Your daily dose of inspiration awaits – start to read or write
              with us.
            </h1>
            <h5
              className={`${
                inView1 ? "animate--fade-in-left first" : "hidden"
              }`}
            >
              Register and create your first blog.
            </h5>
            <button
              className="getStartedButton"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
          <h3>Popular Posts</h3>
          <div
            className="d-flex flex-wrap justify-content-center mt-5"
            ref={ref}
          >
            {state.data.slice(0, 10).map((card) => (
              <Card
                className={`cards ${
                  inView ? "animate--fade-in-right" : "hidden"
                }`}
                bg={getRandomColor().toLowerCase()}
                key={card._id}
                style={{ width: "18rem", margin: "10px" }}
                text={
                  getRandomColor().toLowerCase() === "light" ? "dark" : "white"
                }
              >
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                  <Card.Text>{card.content}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Home;
