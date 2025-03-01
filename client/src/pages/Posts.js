import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
// import Header from "../components/header/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Posts = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { text },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setPosts([res.data, ...posts]);
      setText("");
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors[0].msg);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/like/${id}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
    //   console.log(res.data);
      // Update the post likes in the state
      setPosts(posts.map(post => post._id === id ? { ...post, likes: res.data } : post));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/unlike/${id}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
    //   console.log(res.data);
      // Update the post likes in the state
      setPosts(posts.map(post => post._id === id ? { ...post, likes: res.data } : post));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Container>
        <h2 className="my-4">Posts</h2>
        {isAuthenticated && (
          <Form onSubmit={handlePostSubmit}>
            <Form.Group controlId="postText">
              <Form.Label>Say Something...</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        )}
        <Row className="mt-4">
          {posts.map((post) => (
            <Col md={6} key={post._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.name}</Card.Title>
                  <Card.Text>{post.text}</Card.Text>
                  <Button as={Link} to={`/profile/${post.user}`} variant="link">
                    View Profile
                  </Button>
                  <Button variant="link" as={Link} to={`./${post._id}`}>View Post</Button>
                  <Button variant="link" onClick={() => handleLike(post._id)}>
                    Like {post.likes.length}
                  </Button>
                  <Button variant="link" onClick={() => handleUnlike(post._id)}>
                    Unlike
                  </Button>
                  <Button variant="link">Comment</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Posts;
