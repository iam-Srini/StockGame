import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Container>
          <p>This is the main content area.</p>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
