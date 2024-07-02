import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Router>
        <AuthProvider>
          <Header/>
            <Routes>
              <Route element={<PrivateRoute Component={HomePage} />} path="/" exact />
              <Route element={<LoginPage />} path="/login" />
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
