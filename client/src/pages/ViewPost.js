import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
// import Header from "../components/header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ViewPost = () => {
  const { postId } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/like/${postId}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setPost({ ...post, likes: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/unlike/${postId}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setPost({ ...post, likes: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/${postId}`,
        { text: commentText },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setPost({ ...post, comments: res.data });
      setCommentText("");
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors[0].msg);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Row className="my-4">
          <Col md={8} className="mx-auto">
            <Card>
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
                <Button variant="link" onClick={handleLike}>
                  Like {post.likes.length}
                </Button>
                <Button variant="link" onClick={handleUnlike}>
                  Unlike
                </Button>
              </Card.Body>
            </Card>
            <h3 className="mt-4">Comments</h3>
            {isAuthenticated && (
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="commentText">
                  <Form.Label>Leave a Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="primary" type="submit" className="mt-2">
                  Submit
                </Button>
              </Form>
            )}
            <Row className="mt-4">
              {post.comments.map((comment) => (
                <Col md={12} key={comment._id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{comment.name}</Card.Title>
                      <Card.Text>{comment.text}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewPost;
