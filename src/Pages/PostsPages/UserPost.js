import React, { useEffect, useState } from "react";
import { url } from "../../App";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserPost() {
  const Navigate=useNavigate()
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${url}/blogs/userpost`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
        )
        .then((res) => {
          // console.log(res.data);
          setUserPost(res.data);
        });
    }
    fetchData();
  }, []);

  const deletePost=async(id)=>{
    await axios.delete(`/blogs/deletePost/${id}`,
    // {
    //   headers:{
    //     Authorization:`Bearer ${sessionStorage.getItem("token")}`
    //   }
    // }
    )
    .then((res)=>{
      toast.success(res.data.message)
      setUserPost(userPost.filter((post)=>{return post._id !== id}))
    })
    .catch((error)=>{
      toast.error(error.response.data.message)
    })
  }
  return (
    <div>
      <Container className="text-center mt-5">
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {/* {console.log(userPost)} */}
          {userPost.map((card) => (
            <Card key={card._id} style={{ width: "18rem", margin: "10px" }}>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <Card.Text>{card.content}</Card.Text>
                <Card.Footer>
                  <div className="btn-group d-flex justify-content-between">
                  <button className="btn btn-secondary" onClick={()=>{Navigate('/user/editpost',{state:card})}}>Edit</button>
                  <button className="btn btn-danger" onClick={()=>{deletePost(card._id)}}>Delete</button>
                  </div>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default UserPost;
