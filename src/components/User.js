import React from 'react'
import { Container, Navbar, Nav} from "react-bootstrap";
import { HiCubeTransparent } from "react-icons/hi";
import { Outlet,useNavigate } from 'react-router-dom';

function User() {
  const Navigate=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    Navigate('/login')
  }
  return (
    <div>
       <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/"><HiCubeTransparent className="mb-1"/>{" "}BlogHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={()=>{Navigate('dashboard')}}>Dashboard</Nav.Link>
              <Nav.Link onClick={()=>{Navigate('addpost')}}>Add Post</Nav.Link>
              <Nav.Link onClick={()=>{Navigate('userpost')}}>My Post</Nav.Link>
              <Nav.Link onClick={()=>{logout()}}>logout</Nav.Link>
              {/* <Nav.Link>{sessionStorage.getItem('username')}</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}

export default User