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
/*---------------------------  Render  -----------------------------*/
export default function App() {
  const [inputs, setInputs] = useState({
    letter1: "",
    letter2: "",
    letter3: "",
    letter4: "",
    letter5: "",
  });

  const [wordLists, setWordLists] = useState<string[]>([]);
  const [wordAnswers, setWordAnswers] = useState<string[]>([]);
  const [containedLetters, setContainedLetters] = useState("");
  const [noncontainedLetters, setNonContainedLetters] = useState("");

  const inputChange = (e: any) => {
    const { maxLength, value } = e.target;
    const id = e.target.getAttribute("data-id");
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.toLowerCase(),
    });
    if (value.length >= maxLength) {
      if (id < 4) {
        const nextInput = document.querySelector(
          "input[data-id='" + (parseInt(id) + 1) + "']"
        );
        console.log(nextInput);
        if (nextInput !== null) {
          (nextInput as HTMLElement).focus();
          console.log("focused");
        }
      }
    }
  };
  const containedChange = (e: any) => {
    const { value } = e.target;
    const lastChar = value.slice(-1);

    const onlyLetters = e.target.value.replace(/[^a-zA-Z]/g, "");

    if (
      e.target.name === "containedLetter" &&
      !noncontainedLetters.includes(lastChar)
    ) {
      setContainedLetters(Array.from(new Set(onlyLetters.split(""))).join(""));
    }
    if (
      e.target.name === "noncontainedLetter" &&
      !containedLetters.includes(lastChar)
    ) {
      setNonContainedLetters(
        Array.from(new Set(onlyLetters.split(""))).join("")
      );
    }
  };

  const findAnswers = () => {
    let tempArray: string[] = [];
    for (const eachWord of wordLists) {
      let breakCheck1 = false;
      let breakCheck2 = false;
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
      for (const c of containedLetters) {
        console.log(c);
        if (!eachWord.includes(c)) {
          console.log("contained breaked");
          breakCheck1 = true;
        }
      }
      for (const c of noncontainedLetters) {
        if (eachWord.includes(c)) {
          console.log("NON contained breaked");
          breakCheck2 = true;
        }
      }
      if (breakCheck1 || breakCheck2) continue;
      tempArray.push(eachWord.toUpperCase());
    }
    setWordAnswers(tempArray);
  };

  const clearInput = () => {
    setInputs({
      letter1: "",
      letter2: "",
      letter3: "",
      letter4: "",
      letter5: "",
    });
    setContainedLetters("");
    setNonContainedLetters("");
  };

  useEffect(() => {
    if (!wordLists.length) {
      console.log("This fetch is loaded");
      wordArrays().then((fetchedWord: any) => {
        setWordLists(fetchedWord);
      });
    }
    if (!Object.values(inputs).every((x) => x === null || x === "")) {
      console.log("inputs detected");
      findAnswers();
    }
  }, [inputs, containedLetters, noncontainedLetters]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Wordle Answer</p>
      </header>
      <div className="App-body">
        <div className="App-Contained-Container">
          <p>Contained Letters</p>
          <input
            className="App-Contain-Input"
            name="containedLetter"
            value={containedLetters}
            autoComplete="off"
            type={"text"}
            onChange={containedChange}
          />
          <p>Non-contained letter</p>
          <input
            className="App-Contain-Input"
            name="noncontainedLetter"
            value={noncontainedLetters}
            type={"text"}
            onChange={containedChange}
          />
        </div>
        <div>
          <p>Letters</p>
          <input
            className="App-Input"
            name="letter1"
            data-id="0"
            type={"text"}
            value={inputs.letter1}
            maxLength={1}
            autoFocus={true}
            onChange={inputChange}
          />
          <input
            className="App-Input"
            name="letter2"
            data-id="1"
            type={"text"}
            value={inputs.letter2}
            maxLength={1}
            onChange={inputChange}
          />
          <input
            className="App-Input"
            name="letter3"
            data-id="2"
            type={"text"}
            value={inputs.letter3}
            maxLength={1}
            onChange={inputChange}
          />
          <input
            className="App-Input"
            name="letter4"
            data-id="3"
            type={"text"}
            value={inputs.letter4}
            maxLength={1}
            onChange={inputChange}
          />
          <input
            className="App-Input"
            name="letter5"
            data-id="4"
            type={"text"}
            value={inputs.letter5}
            maxLength={1}
            onChange={inputChange}
          />
          <button style={{ width: 100, height: 100 }} onClick={clearInput}>
            <p>Reset</p>
          </button>
        </div>

        {(inputs.letter1 ||
          inputs.letter2 ||
          inputs.letter3 ||
          inputs.letter4 ||
          inputs.letter5) && (
          <div className="App-Answers-Container">
            {wordAnswers?.map((word, i) => {
              return (
                <p className="App-Answers-Items" key={i}>
                  {word}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
