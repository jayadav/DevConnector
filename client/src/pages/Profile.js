import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
// import Header from "../components/header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <Header /> */}
      <Container>
        <Row className="my-4">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={profile.user.avatar} />
              <Card.Body>
                <Card.Title>{profile.user.name}</Card.Title>
                <Card.Text>{profile.bio}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem><strong>Status:</strong> {profile.status}</ListGroupItem>
                <ListGroupItem><strong>Company:</strong> {profile.company}</ListGroupItem>
                <ListGroupItem><strong>Location:</strong> {profile.location}</ListGroupItem>
                <ListGroupItem><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href={profile.social?.twitter} target="_blank">Twitter</Card.Link>
                <Card.Link href={profile.social?.facebook} target="_blank">Facebook</Card.Link>
                <Card.Link href={profile.social?.linkedin} target="_blank">LinkedIn</Card.Link>
                <Card.Link href={profile.social?.youtube} target="_blank">YouTube</Card.Link>
                <Card.Link href={profile.social?.instagram} target="_blank">Instagram</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <h2>Skills</h2>
            <ListGroup>
              {profile.skills.map((skill, index) => (
                <ListGroupItem key={index}>{skill}</ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
