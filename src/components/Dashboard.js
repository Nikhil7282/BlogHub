import React,{useState,useEffect} from 'react'
import { Container, Card,Button } from "react-bootstrap";
import { url } from "../App";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import {AiFillLike,AiFillDislike} from 'react-icons/ai'

function Dashboard() {
  const Navigate=useNavigate()
  const [blogData,setBlogData]=useState([])

  const logout =()=>{
    sessionStorage.clear()
    Navigate('/login')
  }
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      fetchData()
    }
    else{
      logout()
    }
  },[])

  const fetchData= async()=>{
    try {
      const res=await axios.get(`${url}/blogs`)
      setBlogData(res.data)
      // console.log(res.data)
    } catch (error) {
      if(error.response.status ===401 ||error.response.status ===400){
        logout()
        toast.error(error.response.data.message)
      }
      // console.log(error)
    }
  }

  const getRandomColor = () => {
    const colors = ['Primary','Secondary','Success','Danger','Warning','Info','Dark'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div>
       <Container className="text-center mt-5">
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
              <Card.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{new Date(card.createdAt).toLocaleDateString()}</div>
          {/* <Button variant="primary">Like</Button> */}
          <div style={{display:'flex',alignItems:'center'}}>
          <AiFillLike/>
          <span style={{ marginLeft: '5px' }}>{0} Likes</span>
          </div>
        </div>
      </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Dashboard