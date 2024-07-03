import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  let [notes, setNotes] = useState([])
  let {authTokens} = useContext(AuthContext)

  useEffect(()=> {
      getNotes()
  }, [])

  let getNotes = async ()=> {
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    setNotes(data)
  }

  return (
    <div>
        <p>Welcome to the home page!!!</p>

        <ul>
          {notes.map(note => (
            <li key={note.id}>
              {note.body}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default HomePage