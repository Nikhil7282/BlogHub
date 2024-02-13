import React, { useContext, useRef } from "react";
import { Container, Card } from "react-bootstrap";
import { postContext } from "../context/globalContext.js";
import NewNavbar from "./NewNavbar.js";
import Loader from "./Loader.js";
import { useScroll, motion } from "framer-motion";
import HomeAnimation from "./Home/HomeAnimation.js";
function Home() {
  const { ref } = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["1 0", "1 0"],
  });
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
          <motion.section
            ref={ref}
            style={{
              scale: scrollYProgress,
              opacity: scrollYProgress,
            }}
          >
            <div className="home">
              <div className="quotes">
                <h1>
                  Your daily dose of inspiration awaits – start to read or write
                  with us.
                </h1>
                <h5>Register and create your first blog.</h5>
              </div>
              <div className="home-animation">
                <HomeAnimation />
              </div>
            </div>
          </motion.section>
          <section>
            <div className="d-flex flex-wrap justify-content-center mt-5">
              {state.data.slice(0, 10).map((card) => (
                <Card
                  className="cards"
                  bg={getRandomColor().toLowerCase()}
                  key={card._id}
                  style={{ width: "18rem", margin: "10px" }}
                  text={
                    getRandomColor().toLowerCase() === "light"
                      ? "dark"
                      : "white"
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
          </section>
        </Container>
      )}
    </div>
  );
}

export default Home;
