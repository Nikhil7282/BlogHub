import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function PostPage() {
    const location=useLocation()
    const {card}=location.state
    // console.log(card);
    const {id}=useParams()
  return (
    <Container className='mt-5' style={{width:"fit-content", backgroundColor: '#f8f9fa', padding: '2rem' }}>
      <Row>
        <Col>
          <h1>{card.title}</h1>
          <p>{card.description}</p>
          <p>{card.content}</p>
          <p>Likes:{" "}{card.likes.length}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="comment" style={{width:"100%"}}>
              <Form.Label>Add a comment:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={""}
                placeholder='Add a Comment'
                // onChange={(event) => setCommentText(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-5'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      {/* {comments.length > 0 && (
        <Row>
          <Col>
            <h2>Comments:</h2>
            {comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </Col>
        </Row>
      )} */}
    </Container>
  )
}

export default PostPage