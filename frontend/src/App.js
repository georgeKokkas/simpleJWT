import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Router>
        <Header/>
          <Routes>
            <Route element={<HomePage />} path="/" exact /> // PrivateRoute Component={HomePage}
            <Route element={<LoginPage />} path="/login" />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
