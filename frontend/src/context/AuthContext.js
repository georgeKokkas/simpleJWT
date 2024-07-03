import { createContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
  );
  const [loading, setLoading] = useState(true);
  const [tokenUpdating, setTokenUpdating] = useState(false);

  const navigate = useNavigate();
  const isInitialMount = useRef(true); // To track initial mount

  // Function to handle user login
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('New tokens:', data);
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/');
      } else {
        alert('Something went wrong!!!');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to handle user logout
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  // Function to update JWT token
  const updateToken = async () => {
    if (!authTokens || tokenUpdating) return; // Prevent multiple calls
    setTokenUpdating(true); // Set flag to true

    console.log('Updating token...');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('New tokens:', data);
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        console.log('Failed to update token:', data);
        logoutUser();
      }
    } catch (error) {
      console.error('Error updating token:', error);
    }

    setTokenUpdating(false); // Reset flag right after the POST request

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (authTokens) {
        console.log("Calling updateToken...");
        updateToken();
      }
      setLoading(false);
    } else {
      const fourMinutes = 1000 * 60 * 4;
      const interval = setInterval(() => {
        console.log("Interval called");
        if (authTokens) {
          updateToken();
        }
      }, fourMinutes);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens]);

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
