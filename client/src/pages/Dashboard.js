import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Header from "../components/header/Header";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={12} className="body-content">
            <h2>Welcome to the Dashboard</h2>
            <p>This is the body content of the dashboard.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
