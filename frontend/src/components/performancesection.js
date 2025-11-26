import { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Container } from "react-bootstrap";

import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import performanceRanges from "../data/linecharts.json";
import pieChart from "../data/piecharts.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function PerformanceSection() {
  const [range, setRange] = useState("1M");

  const selected = performanceRanges[range];

  const lineData = {
    labels: selected.labels,
    datasets: [
      {
        label: "Portfolio Value",
        data: selected.values,
        borderWidth: 3,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const pieData = {
    labels: pieChart.labels,
    datasets: [
      {
        data: pieChart.values,
        backgroundColor: pieChart.colors,
      },
    ],
  };

  return (
    <Container>

      {/* Header + Range Buttons */}
      <Stack direction="horizontal" className="mb-3" gap={3}>
        <h5 className="mb-0 flex-grow-1">Portfolio Performance</h5>

        {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((btn) => (
          <Button
            key={btn}
            size="sm"
            variant={range === btn ? "primary" : "outline-secondary"}
            onClick={() => setRange(btn)}
          >
            {btn}
          </Button>
        ))}
      </Stack>

      {/* Layout */}
      <Row>
        <Col md={8}>
          <div style={{ height: "300px" }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </Col>

        <Col md={4}>
          <div style={{ height: "300px" }}>
            <Pie data={pieData} />
          </div>
        </Col>
      </Row>

    </Container>
  );
}

export default PerformanceSection;
