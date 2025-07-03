import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './AboutTeam.css'; // You might need to create this CSS file

const AboutTeam = () => {
  return (
    <Container className="about-team-container">
      <h1>About Our Team</h1>
      <Row>
        <Col md={4}>
          <div className="team-member">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Team Member 1"
              className="team-member-image"
            />
            <h3>John Doe</h3>
            <p>Role: CEO</p>
            <p>Brief description of John's experience and expertise.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="team-member">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Team Member 2"
              className="team-member-image"
            />
            <h3>Jane Smith</h3>
            <p>Role: CTO</p>
            <p>Brief description of Jane's experience and expertise.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="team-member">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Team Member 3"
              className="team-member-image"
            />
            <h3>Peter Jones</h3>
            <p>Role: Marketing Manager</p>
            <p>Brief description of Peter's experience and expertise.</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Our Mission</h2>
          <p>
            A paragraph describing the team's mission and goals. This should align with the overall
            company mission and provide a sense of purpose.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Our Values</h2>
          <ul>
            <li>Innovation</li>
            <li>Collaboration</li>
            <li>Customer Focus</li>
            <li>Integrity</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutTeam;