import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  // This gets called only on page load to setup socketio
  useEffect(() => {
    // Using default route with same port and ip as server
    const socket = io();
    // Gets called if the connection is successful
    socket.on("connect", () => {  console.log(`Connected to server, id: ${socket.id}`); });
    // Gets called if the connection is broken
    socket.on("disconnect", () => {
      alert("Disconnected from server!");
      // Set timeout every second to retry connecting
      setTimeout(() => { socket.connect(); }, 1000);
    });
    // Gets called if the connection is unsuccessful
    socket.on("connect_error", () => {
      alert("Connection error to socket!");
      // Set timeout every second to retry connecting
      setTimeout(() => { socket.connect(); }, 1000);
    });
    // Custom socket response recieved after clicking submit form button
    socket.on("login_response", (args) => {
      if (args['success']) {
        console.log(`Success, token: ${args['token']}`);
        document.cookie = "username=John Doe"; 
      } else {
        console.log("Fail");
      }
    });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function that gets called on submit button
  function HandleForm(e) {
    e.preventDefault();
    if (!username || password)
      return;

    fetch("/api", { 
      method: 'POST', 
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' ,
        'test': '12346'
      }, 
      body: JSON.stringify({
        'username': username,
        'password': password 
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    
    // Clearing text fields
    setUsername("");
    setPassword("");
  }

  return (
    <div className='page-wrapper'>
      <p>This site uses cookies</p>
      <form onSubmit={HandleForm}>
        <label>Username</label><br />
        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} ></input><br />
        <label>Password</label><br />
        <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}} ></input><br />
        <button type="submit">Login</button><br />
      </form>
    </div>
  );
}

export default App;