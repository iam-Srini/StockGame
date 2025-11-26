import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import PerformanceSection from "../components/performancesection";
import HoldingsTable from "../components/HoldingTable";
import InsightsSection from "../components/InsightsSection";

function Dashboard() {
  return (
    <Container className="mt-4">
      <Stack gap={4}>

        {/* Section 1 - Portfolio Summary */}
        <Card>
  <Card.Body>
    <h5 className="mb-4">Portfolio Summary</h5>

    <Stack direction="horizontal" gap={3}>

      <div className="p-3 bg-light rounded flex-fill">
        <div className="fw-bold text-secondary">Portfolio Value</div>
        <div className="fs-4">$12,530.45</div>
      </div>

      <div className="p-3 bg-light rounded flex-fill">
        <div className="fw-bold text-secondary">Today P/L</div>
        <div className="fs-4 text-success">+2.45%</div>
      </div>

      <div className="p-3 bg-light rounded flex-fill">
        <div className="fw-bold text-secondary">Total P/L</div>
        <div className="fs-4 text-success">+18.90%</div>
      </div>

      <div className="p-3 bg-light rounded flex-fill">
        <div className="fw-bold text-secondary">Cash Available</div>
        <div className="fs-4">$1,250.00</div>
      </div>

    </Stack>
  </Card.Body>
</Card>


        {/* Section 2 - Performance Charts */}
        <Card>
          <Card.Body>
            <PerformanceSection />
          </Card.Body>
        </Card>

        {/* Section 3 - Holdings Table */}
        <Card>
          <Card.Body>
            <HoldingsTable/>
          </Card.Body>
        </Card>

        {/* Section 4 - Other Insights */}
        <Card>
          <Card.Body>
            <InsightsSection />
          </Card.Body>
        </Card>

      </Stack>
    </Container>
  );
}

export default Dashboard;
