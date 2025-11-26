import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table, Badge } from "react-bootstrap";

// Alerts JSON
import alertsList from "../data/alertList.json";

function Alerts() {
  const [alerts, setAlerts] = useState(alertsList);

  // Form fields
  const [symbol, setSymbol] = useState("");
  const [conditionType, setConditionType] = useState("Above");
  const [value, setValue] = useState("");

  // Add new alert
  const addAlert = () => {
    if (!symbol || !value) {
      alert("Please enter symbol and value");
      return;
    }

    const newAlert = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      condition: `Price ${conditionType === "Above" ? ">" : "<"} ${value}`,
      active: true
    };

    setAlerts([...alerts, newAlert]);

    // Reset fields
    setSymbol("");
    setConditionType("Above");
    setValue("");
  };

  // Delete alert
  const deleteAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  // Toggle alert active/inactive
  const toggleActive = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <Container className="mt-4">

      <h3>Alerts</h3>
      <hr />

      {/* ------------ Create Alert Form ------------ */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            placeholder="Symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
        </Col>

        <Col md={3}>
          <Form.Select
            value={conditionType}
            onChange={(e) => setConditionType(e.target.value)}
          >
            <option value="Above">Price Above</option>
            <option value="Below">Price Below</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Control
            placeholder="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Button variant="primary" onClick={addAlert}>
            Add Alert
          </Button>
        </Col>
      </Row>

      {/* ------------ Alerts List Table ------------ */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Condition</th>
            <th>Status</th>
            <th>Toggle</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.symbol}</td>
              <td>{alert.condition}</td>

              <td>
                {alert.active ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="secondary">Inactive</Badge>
                )}
              </td>

              <td>
                <Button
                  variant={alert.active ? "warning" : "success"}
                  size="sm"
                  onClick={() => toggleActive(alert.id)}
                >
                  {alert.active ? "Disable" : "Enable"}
                </Button>
              </td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteAlert(alert.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>

      {alerts.length === 0 && (
        <p className="text-muted text-center">No alerts added.</p>
      )}
    </Container>
  );
}

export default Alerts;
