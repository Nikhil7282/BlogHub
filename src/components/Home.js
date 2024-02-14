import React, { useContext, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { postContext } from "../context/globalContext.js";
import NewNavbar from "./NewNavbar.js";
import Loader from "./Loader.js";
import { useNavigate } from "react-router-dom";
function Home() {
  const { state } = useContext(postContext);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  }, []);

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
      }}
    >
      <NewNavbar state="Home" />
      {state.loading ? (
        <Loader />
      ) : (
        <Container className="text-center mt-5">
          <section className="quotes hidden">
            <h1>
              Your daily dose of inspiration awaits – start to read or write
              with us.
            </h1>
            <h5>Register and create your first blog.</h5>
            <button
              className="getStartedButton"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </section>
          <div className="d-flex flex-wrap justify-content-center mt-5">
            {state.data.slice(0, 10).map((card) => (
              <Card
                className="cards hidden"
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
