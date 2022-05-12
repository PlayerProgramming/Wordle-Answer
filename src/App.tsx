import React, { useEffect, useState } from "react";
import useFetch from "./useFetchURL";
import "./App.css";
/*---------------------------  Main  -----------------------------*/
export default function App() {
  const [inputs, setInputs] = useState({
    letter0: "",
    letter1: "",
    letter2: "",
    letter3: "",
    letter4: "",
  });
  const wordLists: any[] = useFetch(
    "https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt"
  );
  const [wordAnswers, setWordAnswers] = useState<string[]>([]);
  const [containedLetters, setContainedLetters] = useState("");
  const [noncontainedLetters, setNonContainedLetters] = useState("");

  const inputChange = (e: any) => {
    const { maxLength, value } = e.target;
    const id = e.target.getAttribute("data-id");
    let nonContainedBreak = false;
    for (const c of noncontainedLetters) {
      if (c === value) {
        nonContainedBreak = true;
      }
    }
    if (!nonContainedBreak) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value.toLowerCase(),
      });
      if (value.length >= maxLength) {
        if (id < 4) {
          const nextInput = document.querySelector(
            "input[data-id='" + (parseInt(id) + 1) + "']"
          );
          if (nextInput !== null) {
            (nextInput as HTMLElement).focus();
          }
        }
      }
    }
  };
  const containedChange = (e: any) => {
    console.log("contained change detected");
    console.log(e.which);
    const values = e.target.value.toLowerCase();

    const lastChar = values.slice(-1);
    const onlyLetters = values.replace(/[^a-zA-Z]/g, "");

    console.log(onlyLetters);
    const nonContainedBreak = Object.values(inputs).some(
      (x) => values.includes(x) && x !== ""
    );

    /*Checking if lastChar is empty for deleting events */
    if (
      (e.target.name === "containedLetter" &&
        !noncontainedLetters.includes(lastChar)) ||
      (e.target.name === "containedLetter" && lastChar === "")
    ) {
      setContainedLetters(Array.from(new Set(onlyLetters.split(""))).join(""));
      console.log("Set CONTAINED Letters Runned");
      console.log("New CONTAINED Letters: " + containedLetters);
    } else if (
      (e.target.name === "noncontainedLetter" &&
        !containedLetters.includes(lastChar) &&
        !nonContainedBreak) ||
      (e.target.name === "noncontainedLetter" && lastChar === "")
    ) {
      setNonContainedLetters(
        Array.from(new Set(onlyLetters.split(""))).join("")
      );
      console.log("New NON-CONTAINED Letters: " + noncontainedLetters);
    }
  };
  const findAnswers = () => {
    let tempArray: string[] = [];
    for (const eachWord of wordLists) {
      let breakCheck1 = false;
      let breakCheck2 = false;
      if (
        (inputs.letter0 && inputs.letter0 !== eachWord[0]) ||
        (inputs.letter1 && inputs.letter1 !== eachWord[1]) ||
        (inputs.letter2 && inputs.letter2 !== eachWord[2]) ||
        (inputs.letter3 && inputs.letter3 !== eachWord[3]) ||
        (inputs.letter4 && inputs.letter4 !== eachWord[4])
      ) {
        continue;
      }
      for (const c of containedLetters) {
        if (!eachWord.includes(c)) {
          breakCheck1 = true;
        }
      }
      for (const c of noncontainedLetters) {
        if (eachWord.includes(c)) {
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
      letter0: "",
      letter1: "",
      letter2: "",
      letter3: "",
      letter4: "",
    });
    setContainedLetters("");
    setNonContainedLetters("");
    const nextInput = document.querySelector("input[data-id='0']");
    (nextInput as HTMLElement).focus();
  };

  useEffect(() => {
    if (
      !Object.values(inputs).every((x) => x === null || x === "") ||
      containedLetters !== "" ||
      noncontainedLetters !== ""
    ) {
      findAnswers();
    }
  }, [inputs, containedLetters, noncontainedLetters]);

  /*---------------------------  Render  -----------------------------*/
  return (
    <div className="App">
      <header className="App-header">
        <p>Wordle Answer</p>
      </header>
      <div className="App-body">
        <div className="App-body-Inner-Container">
          <div className="App-Contained-Container">
            <div>
              <p className="App-Contained-Text">Contained</p>
              <input
                className="App-Contained-Input"
                name="containedLetter"
                value={containedLetters}
                defaultValue={containedLetters}
                type={"text"}
                onChange={containedChange}
              />
            </div>
            <div>
              <p className="App-Contained-Text">Non-contained</p>
              <input
                className="App-Contained-Input"
                name="noncontainedLetter"
                value={noncontainedLetters}
                type={"text"}
                onChange={containedChange}
              />
            </div>
          </div>
          <div>
            <p className="App-Contained-Text">Letters</p>
            <input
              className="App-Input"
              style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
              name="letter0"
              data-id="0"
              type={"text"}
              value={inputs.letter0}
              maxLength={1}
              autoFocus={true}
              onChange={inputChange}
            />
            <input
              className="App-Input"
              name="letter1"
              data-id="1"
              type={"text"}
              value={inputs.letter1}
              maxLength={1}
              onChange={inputChange}
            />
            <input
              className="App-Input"
              name="letter2"
              data-id="2"
              type={"text"}
              value={inputs.letter2}
              maxLength={1}
              onChange={inputChange}
            />
            <input
              className="App-Input"
              name="letter3"
              data-id="3"
              type={"text"}
              value={inputs.letter3}
              maxLength={1}
              onChange={inputChange}
            />
            <input
              className="App-Input"
              style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
              name="letter4"
              data-id="4"
              type={"text"}
              value={inputs.letter4}
              maxLength={1}
              onChange={inputChange}
            />
            <button className="App-Reset" onClick={clearInput}>
              <p className="App-Reset-Text">Reset</p>
            </button>
          </div>
          <p>{containedLetters}</p>
        </div>
        {(inputs.letter0 ||
          inputs.letter1 ||
          inputs.letter2 ||
          inputs.letter3 ||
          inputs.letter4 ||
          containedLetters ||
          noncontainedLetters) && (
          <div className="App-Answers-Container">
            {wordAnswers?.map((word, i) => (
              <div key={i}>
                <p className="App-Answers-Items">{word}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

//PLIER
