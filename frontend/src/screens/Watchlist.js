import React, { useState } from "react";
import { Container, Table, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import JSON data
import initialWatchlistData from "../data/watchlist.json";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlistData);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toUpperCase());
  };

  // Add a new stock manually
  const addStock = () => {
    if (!searchTerm) return;

    // Avoid duplicates
    if (watchlist.some((item) => item.symbol === searchTerm)) {
      alert("Stock already in watchlist!");
      return;
    }

    // Add empty placeholder (future API can fill data)
    const newItem = {
      symbol: searchTerm,
      name: "Unknown",
      ltp: 0,
      change: 0,
      dayHigh: 0,
      dayLow: 0
    };

    setWatchlist([...watchlist, newItem]);
    setSearchTerm("");
  };

  // Remove stock
  const removeStock = (symbol) => {
    setWatchlist(watchlist.filter((item) => item.symbol !== symbol));
  };

  return (
    <Container className="mt-4">

      {/* SEARCH + ADD */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search symbol (ex: AAPL)"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={addStock}>
            Add
          </Button>
        </Col>
      </Row>

      {/* WATCHLIST TABLE */}
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>LTP</th>
                <th>Change %</th>
                <th>Day High</th>
                <th>Day Low</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {watchlist.map((item, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/stock/${item.symbol}`} style={{ textDecoration: "none" }}>
                         {item.symbol}
                     </Link>
                    </td>
                  <td>{item.name}</td>
                  <td>${item.ltp.toFixed(2)}</td>
                  <td
                    style={{
                      color: item.change >= 0 ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {item.change.toFixed(2)}%
                  </td>
                  <td>${item.dayHigh.toFixed(2)}</td>
                  <td>${item.dayLow.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeStock(item.symbol)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
        </Col>
      </Row>

    </Container>
  );
}

export default Watchlist;
