import React, { useState, useEffect } from "react";

function useFetchWords(url: string) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    fetch(url)
      .then((words) => words.text())
      .then((textedWords) => {
        setData(textedWords.replace(/\r\n/g, "\n").split("\n"));
      });
    console.log("CUSTOM useEffect detected");
  }, [url]);
  return data;
}

export default useFetchWords;
