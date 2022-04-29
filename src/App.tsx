import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const [word, setWord] = useState("");
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt"
    )
      .then((words) => words.text())
      .then((textedWords) => setWord(textedWords));
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>Wordle Answer</p>
      </header>
      <body className="App-body">
        <div>
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
        </div>
        <p>API calling</p>
        <p>{word}</p>
      </body>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
