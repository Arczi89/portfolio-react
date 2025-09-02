import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/components/Home';
import Contact from './app/components/Contact';
import Interests from './app/components/Interests';
import { NotFound } from './app/components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
