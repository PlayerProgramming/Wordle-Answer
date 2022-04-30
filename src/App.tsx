import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
async function test1() {
  let array1;
  let arr;
  await fetch(
    "https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt"
  )
    .then((words) => words.text())
    .then((textedWords) => {
      array1 = textedWords.split("\n");
      arr = textedWords.replace(/\r\n/g, "\n").split("\n");
    });
  console.log("Array1: ");
  console.log(array1);
  console.log("arr: ");
  console.log("hi");
}
test1();
export default function App() {
  // const [word, setWord] = useState();
  // useEffect(() => {
  //   fetch(
  //     "https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt"
  //   )
  //     .then((words) => words.text())
  //     .then((textedWords) => {
  //       setWord(textedWords.split("\n"));
  //     });
  // });

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
