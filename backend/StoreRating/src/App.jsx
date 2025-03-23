// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
