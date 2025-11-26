import React, { useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Screener JSON
import screenerData from "../data/screener.json";


function Screener() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filtering logic
  const filtered = screenerData.filter((stock) => {
    const matchesSearch =
      search === "" ||
      stock.symbol.toUpperCase().includes(search.toUpperCase()) ||
      stock.name.toUpperCase().includes(search.toUpperCase());

    const matchesSector = sector === "All" || stock.sector === sector;

    const matchesPrice =
      stock.price >= priceRange[0] && stock.price <= priceRange[1];

    return matchesSearch && matchesSector && matchesPrice;
  });

  return (
    <Container fluid className="mt-4">

      <Row>
        {/* ========== FILTER PANEL ========== */}
        <Col md={3}>
          <h4>Filters</h4>
          <hr />

          {/* Search */}
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Symbol or name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>

          {/* Sector Filter */}
          <Form.Group className="mb-3">
            <Form.Label>Sector</Form.Label>
            <Form.Select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Tech">Tech</option>
              <option value="Automobile">Automobile</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
            </Form.Select>
          </Form.Group>

          {/* Price Range */}
          <Form.Group className="mb-3">
            <Form.Label>Price Range (${priceRange[0]} - ${priceRange[1]})</Form.Label>
            <Form.Range
              min={0}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
          </Form.Group>

          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => {
              setSearch("");
              setSector("All");
              setPriceRange([0, 1000]);
            }}
          >
            Reset Filters
          </Button>
        </Col>

        {/* ========== RESULTS TABLE ========== */}
        <Col md={9}>
          <h4>Stock Screener</h4>
          <hr />

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Sector</th>
                <th>Price</th>
                <th>Change %</th>
                <th>Volume</th>
                <th>Market Cap</th>
                <th>52W High/Low</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((stock, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: "none" }}>
                        {stock.symbol}
                    </Link>
                </td>

                  <td>{stock.name}</td>
                  <td>{stock.sector}</td>
                  <td>${stock.price.toFixed(2)}</td>
                  <td
                    style={{
                      color: stock.change >= 0 ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {stock.change}%
                  </td>
                  <td>{stock.volume.toLocaleString()}</td>
                  <td>${(stock.marketCap / 1e9).toFixed(2)}B</td>
                  <td>
                    ${stock.week52High} / ${stock.week52Low}
                  </td>
                  <td>
                    <Button variant="primary" size="sm">
                      Add to Watchlist
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filtered.length === 0 && (
            <p className="text-muted">No stocks match your filters.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Screener;
