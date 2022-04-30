import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
async function test1() {
  let arr;
  return await fetch(
    "https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt"
  )
    .then((words) => words.text())
    .then((textedWords) => {
      arr = textedWords.replace(/\r\n/g, "\n").split("\n");
      return arr;
    });
}

export default function App() {
  const [word, setWord] = useState([]);
  useEffect(() => {
    test1().then((fetchedWord: any) => {
      setWord(fetchedWord);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Wordle Answer</p>
      </header>
      <div className="App-body">
        <div>
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
          <input className="App-Input" type={"text"} maxLength={1} />
        </div>
        <p>API calling</p>
        <p>{word[2]}</p>
      </div>
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
