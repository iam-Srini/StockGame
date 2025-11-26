import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

// Import JSON data
import holdingsData from "../data/holdings.json";

function HoldingsTable() {
  const [data, setData] = useState(holdingsData);
  const [order, setOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  // Calculate portfolio total for weight %
  const totalPortfolioValue = () =>
    data.reduce((acc, item) => acc + item.qty * item.ltp, 0);

  const processed = data.map((row) => {
    const invested = row.qty * row.avg;
    const current = row.qty * row.ltp;
    const totalPL = current - invested;
    const todayPL = ((row.ltp - row.avg) / row.avg) * 100;
    const weight = (current / totalPortfolioValue()) * 100;

    return { ...row, invested, current, totalPL, todayPL, weight };
  });

  // Sorting logic
  const sortData = (field) => {
    let sorted = [...processed].sort((a, b) => {
      if (order === "asc") return a[field] > b[field] ? 1 : -1;
      else return a[field] < b[field] ? 1 : -1;
    });

    setOrder(order === "asc" ? "desc" : "asc");
    setSortField(field);
    setData(sorted);
  };

  return (
    <Container>
      <h5 className="mb-4">Holdings</h5>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => sortData("symbol")} style={{ cursor: "pointer" }}>
              Symbol
            </th>
            <th>Quantity</th>
            <th onClick={() => sortData("avg")} style={{ cursor: "pointer" }}>
              Avg Price
            </th>
            <th onClick={() => sortData("ltp")} style={{ cursor: "pointer" }}>
              LTP
            </th>
            <th onClick={() => sortData("todayPL")} style={{ cursor: "pointer" }}>
              Today P/L %
            </th>
            <th onClick={() => sortData("totalPL")} style={{ cursor: "pointer" }}>
              Total P/L
            </th>
            <th onClick={() => sortData("weight")} style={{ cursor: "pointer" }}>
              Weight %
            </th>
          </tr>
        </thead>

        <tbody>
          {processed.map((row, index) => (
            <tr key={index}>
              <td>{row.symbol}</td>
              <td>{row.qty}</td>
              <td>${row.avg.toFixed(2)}</td>
              <td>${row.ltp.toFixed(2)}</td>
              <td
                style={{
                  color: row.todayPL >= 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {row.todayPL.toFixed(2)}%
              </td>
              <td
                style={{
                  color: row.totalPL >= 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                ${row.totalPL.toFixed(2)}
              </td>
              <td>{row.weight.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default HoldingsTable;
