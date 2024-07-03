import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const didGetNotes = useRef(false);

  useEffect(() => {
    if (!didGetNotes.current) {
      getNotes();
      didGetNotes.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens]);

  const getNotes = async () => {
    console.log('Fetching notes...');
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === 'Unauthorized') {
      logoutUser();
    }
  };

  return (
    <div className="home-container">
      <h2>Welcome to the homepage!</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
