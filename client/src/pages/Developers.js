import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import Header from "../components/header/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile");
        console.log(res.data);
        setDevelopers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Container>
        <h2 className="my-4">Developers</h2>
        <Row>
          {developers.map((developer) => (
            <Col md={4} key={developer._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={developer?.user?.avatar || ""} />
                <Card.Body>
                  <Card.Title>{developer?.user?.name || "Jai"}</Card.Title>
                  <Card.Text>
                    {developer.status} at {developer.company}
                  </Card.Text>
                  <Button as={Link} to={`/profile/${developer?.user?._id || ''}`} variant="primary">
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Developers;
