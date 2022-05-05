import React, { useEffect, useState } from "react";
import "./App.css";
async function wordArrays() {
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

// function test1() {}
// test1();
/*---------------------------  Render  -----------------------------*/
export default function App() {
  const [inputs, setInputs] = useState({
    letter1: "",
    letter2: "",
    letter3: "",
    letter4: "",
    letter5: "",
  });
  const [wordLists, setWordLists] = useState([]);
  const [wordAnswers, setWordAnswers] = useState<string[]>([]);
  const handleChange = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };
  const findAnswers = () => {
    let tempArray: string[] = [];
    for (const eachWord of wordLists) {
      if (inputs.letter1 && inputs.letter1 !== eachWord[0]) {
        continue;
      }
      if (inputs.letter2 && inputs.letter2 !== eachWord[1]) {
        continue;
      }
      if (inputs.letter3 && inputs.letter3 !== eachWord[2]) {
        continue;
      }
      if (inputs.letter4 && inputs.letter4 !== eachWord[3]) {
        continue;
      }
      if (inputs.letter5 && inputs.letter5 !== eachWord[4]) {
        continue;
      }
      tempArray.push(eachWord);
    }
    setWordAnswers(tempArray);
  };
  useEffect(() => {
    wordArrays().then((fetchedWord: any) => {
      setWordLists(fetchedWord);
    });
    findAnswers();
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>Wordle Answer</p>
      </header>
      <div className="App-body">
        <div>
          <input
            className="App-Input"
            name="letter1"
            type={"text"}
            maxLength={1}
            onChange={handleChange}
          />
          <input
            className="App-Input"
            name="letter2"
            type={"text"}
            maxLength={1}
            onChange={handleChange}
          />
          <input
            className="App-Input"
            name="letter3"
            type={"text"}
            maxLength={1}
            onChange={handleChange}
          />
          <input
            className="App-Input"
            name="letter4"
            type={"text"}
            maxLength={1}
            onChange={handleChange}
          />
          <input
            className="App-Input"
            name="letter5"
            type={"text"}
            maxLength={1}
            onChange={handleChange}
          />
        </div>
        <p>API calling</p>
        <p>
          {/* Typed: {inputs.letter1} {inputs.letter2} {inputs.letter3}
          {inputs.letter4} {inputs.letter5} */}
        </p>
        {(inputs.letter1 ||
          inputs.letter2 ||
          inputs.letter3 ||
          inputs.letter4 ||
          inputs.letter5) && (
          <p className="App-Answers">
            {wordAnswers?.map((word, i) => {
              return <p key={i}>{word}</p>;
            })}
          </p>
        )}
      </div>
    </div>
  );
}
