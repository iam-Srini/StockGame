// React & Router
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// UI Framework
import { Container, Row, Col, Button } from "react-bootstrap";

//Chart Imports
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import AiInsights from "../components/AiInsights";
import StockNews from "../components/StockNews";
import StockReports from "../components/StockReports";


//JSON Data
import screenerData from "../data/screener.json";
import chartData from "../data/Stockcharts.json";

// Register Chart Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// ===============================
//STOCK DETAILS COMPONENT
// ===============================
function StockDetails() {
  const { symbol } = useParams();
  const [timeframe, setTimeframe] = useState("1D");
  const [indicator, setIndicator] = useState("regular"); 

  const stock = screenerData.find(
    (s) => s.symbol.toUpperCase() === symbol.toUpperCase()
  );

  const charts = chartData[symbol.toUpperCase()];

  if (!stock || !charts || !charts[timeframe]) {
    return (
      <Container className="mt-4">
        <h3>No Data Found for {symbol}</h3>
      </Container>
    );
  }

  // ===============================
  // 🔵 PRICE CHART DATASETS
  // ===============================
  let priceDataset = [
    {
      label: "Price",
      data: charts[timeframe].price,
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 3,
      tension: 0.3
    }
  ];

  if (indicator === "sma50" && charts[timeframe].sma50) {
    priceDataset.push({
      label: "SMA 50",
      data: charts[timeframe].sma50,
      borderColor: "orange",
      borderWidth: 2,
      tension: 0.3
    });
  }

  const priceChart = {
    labels: charts[timeframe].labels,
    datasets: priceDataset
  };

  // ===============================
  // 🔵 VOLUME CHART
  // ===============================
  const volumeChart = {
    labels: charts[timeframe].labels,
    datasets: [
      {
        label: "Volume",
        data: charts[timeframe].volume,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.15)",
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  };
  
  // HEADER 
  //Determine price color

const isPositive = stock.change >= 0;
const priceColor = isPositive ? "#16c784" : "#ea3943"; // green / red

  return (
    <Container className="mt-4">
      

<h2 className="mb-1">{stock.symbol} – {stock.name}</h2>

<p className="mb-1" style={{ fontSize: "2rem", fontWeight: "700", color: priceColor }}>
  ${stock.price}
  <span style={{ fontSize: "1.1rem", fontWeight: "600", marginLeft: "8px" }}>
    ({isPositive ? "+" : ""}{stock.change}%)
  </span>
</p>

<p className="text-muted">
  Sector: {stock.sector} · Market Cap: {(stock.marketCap / 1e9).toFixed(2)}B
</p>

      {/* ================= PRICE + INDICATORS ================= */}
      <Row className="mb-4 align-items-stretch" style={{ height: "100vh" }}>
        <Col md={9}>

          <div className="p-3 md-3">  

            <h5>Price Chart</h5>

            {/* Timeframe Buttons */}
            <div className="mb-2">
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
                <Button
                  key={tf}
                  size="sm"
                  variant={timeframe === tf ? "primary" : "outline-secondary"}
                  className="me-2"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>

            {/* Indicator Buttons */}
            <div className="mb-2">
              {[
                { key: "regular", label: "Regular" },
                { key: "sma50", label: "SMA 50" }
              ].map((ind) => (
                <Button
                  key={ind.key}
                  size="sm"
                  variant={indicator === ind.key ? "primary" : "outline-secondary"}
                  className="me-2"
                  onClick={() => setIndicator(ind.key)}
                >
                  {ind.label}
                </Button>
              ))}
            </div>

            <div style={{ height: "50vh"}}> 

            <Line key={symbol + timeframe + indicator} data={priceChart} options={{
    maintainAspectRatio: false
  }}/>
            </div>
          </div>

         {/* ================= VOLUME ================= */}


          <div className="p-3" style={{ marginTop: "-10px" }}>
            <h5>Volume</h5>
            <div style={{ height: "25vh", paddingTop: "0px", marginTop: "0px" }}>

            <Line key={symbol + timeframe + "-volume"} data={volumeChart} 
            options={{
            maintainAspectRatio: false,   // 👈 important
            scales: {
                x: { display: false },
                } 
              }} />
            </div>
          </div>
        </Col>


      <Col md={3} style={{ height: "100%" }}>  
        {/* ================= AI INSIGHTS ================= */}
        <AiInsights symbol={symbol} />
        </Col>
      </Row>

      {/* ================= NEWS ================= */}
      <div className="p-2 mb-2 bg-light rounded">
        <StockNews symbol={symbol} />
      </div>


      {/* ================= FINANCIAL REPORTS ================= */}
      <div className="p-2 mb-2 bg-light rounded">
        <StockReports symbol={symbol}/>
      </div>
    </Container>
  );
}

export default StockDetails;
