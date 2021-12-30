import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function App() {
  const socket = io();
  socket.on("connect", () => {  console.log(`Connected to server, id: ${socket.id}`); });
  socket.on("disconnect", () => {  alert("Disconnected from server!") });
  socket.on("connect_error", () => {
    alert("Connection error to socket!");
    setTimeout(() => { socket.connect(); }, 1000);
  });
  socket.on("login_response", (args) => {
    console.log(`username: ${args['username']}
      password: ${args['password']}`);
  });

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  function HandleForm(e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    fetch("/api", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'username': 'Leo', 'password': '123' }) });
      /*.then((res) => res.json())
      .then((result) => {
        console.log(result);
      },
      (error) => {
        alert("Error handling form!");
        console.log(error);
      }
    );*/
  }

  return (
    <form onSubmit={HandleForm}>
      <label>Username</label><br />
      <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} ></input><br />
      <label>Password</label><br />
      <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}} ></input><br />
      <button type="submit">Login</button><br />
    </form>
  );
}

export default App;