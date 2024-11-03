import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './app/components/Home';


function App() {
  console.log("App!");
  console.log(Home);
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
