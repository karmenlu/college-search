import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import Colleges from "./pages/Colleges"
import Programs from "./pages/Programs"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' exact element={<Colleges/>} />
        <Route path='/programs' element={<Programs/>} />
      </Routes>
    </Router>
  );
}

export default App;