import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import { postContext } from "../context/globalContext.js";
import NewNavbar from "./NewNavbar.js";
import Loader from "./Loader.js";

function Home() {
  const { state } = useContext(postContext);
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
        backgroundImage: "url('/path/to/background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <NewNavbar state="Home" />
      {state.loading ? (
        <Loader />
      ) : (
        <Container className="text-center mt-5">
          <h1>Beyond Words Elevate Your Thoughts at BlogHub</h1>
          <h5>Register and create your first blog.</h5>
          <div className="d-flex flex-wrap justify-content-center mt-5">
            {state.data.map((card) => (
              <Card
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
