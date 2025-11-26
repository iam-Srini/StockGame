import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

// Import your screener dataset for now
import screenerData from "../data/screener.json";

function StockDetails() {
  const { symbol } = useParams();

  // find stock details
  const stock = screenerData.find(
    (s) => s.symbol.toUpperCase() === symbol.toUpperCase()
  );

  if (!stock) {
    return (
      <Container className="mt-4">
        <h3>No Data Found for {symbol}</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>{stock.symbol} - {stock.name}</h2>
      <hr />

      <Card className="p-4">
        <p><strong>Sector:</strong> {stock.sector}</p>
        <p><strong>Price:</strong> ${stock.price}</p>
        <p><strong>Today's Change:</strong> {stock.change}%</p>
        <p><strong>Volume:</strong> {stock.volume.toLocaleString()}</p>
        <p><strong>Market Cap:</strong> ${(stock.marketCap / 1e9).toFixed(2)}B</p>
        <p><strong>52 Week High:</strong> ${stock.week52High}</p>
        <p><strong>52 Week Low:</strong> ${stock.week52Low}</p>
      </Card>
    </Container>
  );
}

export default StockDetails;
