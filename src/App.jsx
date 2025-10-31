import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ShowDetail from './components/ShowDetail';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} /> {/*  */}
        </Routes>
        <Footer /> {/*  */}
      </div>
    </Router>
  );
}

export default App;