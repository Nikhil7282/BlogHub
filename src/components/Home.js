import React,{useState,useEffect}from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
// import {useNavigate} from 'react-router-dom'
import { url } from "../App";
import axios from 'axios'
// import { toast } from "react-toastify";
import { HiCubeTransparent } from "react-icons/hi";
function Home(){
  // const navigate=useNavigate()
  const [blogData,setBlogData]=useState([])

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData= async()=>{
    try {
      const res=await axios.get(`${url}/blogs`)
      setBlogData(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRandomColor = () => {
    const colors = ['Primary','Secondary','Success','Danger','Warning','Info','Dark'];
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
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/"><HiCubeTransparent className="mb-1"/>{" "}BlogHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="text-center mt-5">
        <h1>Welcome to BlogHub</h1>
        <h5>Register to create your first blog.</h5>
        {/* <Button variant="primary">Learn More</Button> */}
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {blogData.map((card, index) => (
            <Card 
            bg={getRandomColor().toLowerCase()} 
            key={index} 
            style={{ width: "18rem", margin: "10px"}}
            text={getRandomColor().toLowerCase() === 'light' ? 'dark' : 'white'}
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
    </div>
  );
};

export default Home;
