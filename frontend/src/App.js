import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter as Router,Routes,  Route} from 'react-router-dom';

import {Container} from 'react-bootstrap';
import Dashboard from './screens/dashboard';
import Watchlist from './screens/Watchlist';
import Screener from './screens/screener';
import Alerts from './screens/alerts';
import MyProfile from './screens/myprofile';
import StockDetails from './screens/stockDetails';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/stock/:symbol" element={<StockDetails />} />
          </Routes>

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
