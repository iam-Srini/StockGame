import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import profileData from "../data/profile.json";

function Profile() {
  const [profile, setProfile] = useState(profileData);

  // toggle switches
  const toggleDarkMode = () =>
    setProfile({ ...profile, darkMode: !profile.darkMode });

  const toggleNotifications = () =>
    setProfile({ ...profile, notifications: !profile.notifications });

  return (
    <Container className="mt-4">
      <Row>
        {/* =================== BASIC INFO =================== */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Personal Information</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    readOnly
                    value={profile.name}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control readOnly value={profile.email} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control readOnly value={profile.phone} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control readOnly value={profile.username} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Member Since</Form.Label>
                  <Form.Control readOnly value={profile.joined} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* =================== PREFERENCES =================== */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Preferences</h5>

              <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  value={profile.currency}
                  onChange={(e) =>
                    setProfile({ ...profile, currency: e.target.value })
                  }
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="EUR">EUR - Euro</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Timezone</Form.Label>
                <Form.Select
                  value={profile.timezone}
                  onChange={(e) =>
                    setProfile({ ...profile, timezone: e.target.value })
                  }
                >
                  <option value="America/Chicago">America/Chicago</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                </Form.Select>
              </Form.Group>

              <Form.Check
                type="switch"
                id="dark-mode-switch"
                label="Enable Dark Mode"
                className="mb-3"
                checked={profile.darkMode}
                onChange={toggleDarkMode}
              />

              <Form.Check
                type="switch"
                id="notifications-switch"
                label="Enable Notifications"
                checked={profile.notifications}
                onChange={toggleNotifications}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* =================== ACCOUNT ACTIONS =================== */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Account</h5>

          <Button variant="secondary" className="me-3">
            Change Password
          </Button>

          <Button variant="danger">
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
