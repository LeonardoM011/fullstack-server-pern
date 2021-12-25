import { useState, useEffect, useRef } from 'react';

function App() {
  const textInputRef = useRef();

  function HandleForm(e) {
    e.preventDefault();
    fetch("/api")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      },
      (error) => {
      }
    );
  }

  return (
    <form onSubmit={HandleForm}>
      <label>Username</label><br />
      <input type="text" ref={textInputRef} ></input><br />
      <label>Password</label><br />
      <input type="text" ref={textInputRef} ></input><br />
      <button type="submit">Login</button><br />
    </form>
  );
}

export default App;