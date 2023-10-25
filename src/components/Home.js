// import {useNavigate} from 'react-router-dom'
// import { url } from "../App";
// import { fetchBlogs } from "../axios/customeInstence.js";
// import { toast } from "react-toastify";
import React,{useEffect, useCallback, useReducer} from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
import axios from 'axios'
import { HiCubeTransparent } from "react-icons/hi";
import {initialState,reducer} from "./State.js"
import { url } from "../App.js";

// const initialState={
//   loading:false,
//   data:[],
//   error:null
// }

// const reducer=(state,action)=>{
//   if(action.type==="Fetching"){
//     return {...state,loading:true}
//   }
//   else if(action.type==="Fetch_Success"){
//     return {...state,loading:false,data:action.payload}
//   }
//   else if(action.type==="Fetch_Error"){
//     return {...state,loading:false,error:action.payload}
//   }
//   else{
//     return state
//   }
// }

function Home(){
  const [state,dispatch]=useReducer(reducer,initialState)
  // const navigate=useNavigate()
  // const [blogData,setBlogData]=useState([])

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = useCallback(async()=>{
    try {
      dispatch({type:"Fetching"})
      const res=await axios.get(`${url}/blogs`)
      // const res=await axios.get(`/blogs`)
      // const  res=await fetchBlogs.request()
      // console.log(res);
      dispatch({type:"Fetch_Success",payload:res.data})
      // setBlogData(res.data)
      // console.log(res.data)
    } catch (error) {
      dispatch({type:"Fetch_Error",payload:error})
      console.log(error)
    }
  })

  const getRandomColor = () => {
    const colors = ['Primary','Secondary','Success','Danger','Warning','Info','Dark'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  if(state.loading===true){
    return(
      <div>
          <h1>Loading...</h1>
      </div>
    )
  }
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
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {state.data.map((card, index) => (
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
