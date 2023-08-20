import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillLike} from "react-icons/ai";


function Dashboard() {
  
  const Navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);

  const logout = () => {
    sessionStorage.clear();
    Navigate("/login");
  };
  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      fetchData();
    } else {
      logout();
    }
  }, []);


  //Likes
  //64916d748804398d7414e228
  const handleLike=async(id,userId)=>{
    // e.preventDefault()
    // console.log(id);
    try {
      const post=await blogData.find((post)=>post._id===id)
      // console.log(post)
      const index=await post.likes.findIndex((user)=>user===userId)
      // console.log(index)
      // console.log(id)
      // console.log(userId);
      if(index===-1){
        await axios.post(`${url}/blogs/likePost/${id}`,{
          headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res)=>{
          if(res){
            post.likes.push(userId)
          }
        })
      }
      else{
        await axios.post(`${url}/blogs/unLikePost/${id}`,{
          headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
          }
        })
        post.likes.splice(index,1);
      }
      setBlogData([...blogData])
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/blogs`);
      setBlogData(res.data);
      // console.log(res.data)
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        logout();
        toast.error(error.response.data.message);
      }
      // console.log(error)
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

  return (
    <div>
      <Container className="text-center mt-5">
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {blogData.map((card, index) => (
            <Card
              bg={getRandomColor().toLowerCase()}
              key={index}
              style={{ width: "18rem", margin: "10px" }}
              text={
                getRandomColor().toLowerCase() === "light" ? "dark" : "white"
              }
              onClick={()=>Navigate(`/user/postPage/${card._id}`,{state:{card:card}})}
            >
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{new Date(card.createdAt).toLocaleDateString()}</div>
                  {/* <Button variant="primary">Like</Button> */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {card.likes.some(
                      (userId) => userId === sessionStorage.getItem("userId")
                    ) ? (
                      <AiFillLike onClick={()=>{handleLike(card._id,sessionStorage.getItem("userId"))}} style={{color:"red"}}/>
                    ) : (
                      <AiFillLike onClick={()=>{handleLike(card._id,sessionStorage.getItem("userId"))}} />
                    )}
                    <span style={{ marginLeft: "5px" }}>{card.likes.length} Likes</span>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
