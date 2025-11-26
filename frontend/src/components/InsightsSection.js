import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

// Import JSON data
import gainers from "../data/gainers.json";
import losers from "../data/losers.json";


function InsightsSection() {
  return (
    <Row>
      {/* Top Gainers */}
      <Col md={6}>
         <div className="p-3 bg-light rounded flex-fill">
            <h5>Top Gainers</h5>
            <ListGroup variant="flush">
              {gainers.map((stock, i) => (
                <ListGroup.Item key={i} className="d-flex justify-content-between">
                  <span>{stock.symbol}</span>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {stock.change}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
      </Col>

      {/* Top Losers */}
      <Col md={6}>
        <div className="p-3 bg-light rounded flex-fill">
            <h5>Top Losers</h5>
            <ListGroup variant="flush">
              {losers.map((stock, i) => (
                <ListGroup.Item key={i} className="d-flex justify-content-between">
                  <span>{stock.symbol}</span>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {stock.change}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
      </Col>
    </Row>
  );
}

export default InsightsSection;
