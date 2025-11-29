import axios from "axios";
import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';  



function StockReports({symbol}) {
      const [reports, setreports] = useState([]);

      useEffect(()=>{
        async function fetch_reports() {
          const {data} = await axios.get(`http://127.0.0.1:8000/reports/${symbol}`)
          setreports(data)

        }
        fetch_reports();
      }, [])

      return(
        <div className="p-3 mb-4 bg-light rounded">
        <h5>Financial Reports</h5>
        <Row>
          <Col md={4}><strong>PE Ratio:</strong> {reports.pe}</Col>
          <Col md={4}><strong>EPS:</strong> {reports.eps}</Col>
          <Col md={4}><strong>Revenue:</strong> {reports.revenue}</Col>

          <Col md={4}><strong>Profit Margin:</strong> {reports.profitMargin}</Col>
          <Col md={4}><strong>Dividend Yield:</strong> {reports.dividendYield}</Col>
          <Col md={4}>
            <strong>52W High/Low:</strong> {reports.week52High} / {reports.week52Low}
          </Col>
        </Row>
        </div>
      )
}

export default StockReports;

    