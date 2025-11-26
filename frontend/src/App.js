import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import Dashboard from './screens/dashboard';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Container>
          <Dashboard />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
