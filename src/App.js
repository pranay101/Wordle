import axios from "axios";
import { useEffect, useState } from "react";
import Line from "./Components/Line";
import { isLetter } from "./Utilities/helpers";
function App() {
  const [solution, setsolution] = useState("hello");
  const [rows, setRows] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setisGameOver] = useState(false);
  useEffect(() => {
    const handleKeyPress = (event) => {


      if (isGameOver) {
        return;
      }

      console.log(event.key);
      if (event.key === "Enter") {

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setisGameOver(true);
          return
        }

        const tempRows = [...rows]
        tempRows[rows.findIndex(row => row ==null)] = currentGuess;
        setRows(tempRows)
        setCurrentGuess("")
      }

      // Handling Backspace ie removing the latest character
      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (isLetter(event.key) && currentGuess.length < 5) {
        setCurrentGuess((oldGuess) => oldGuess + event.key);
        return;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [solution, isGameOver,currentGuess,rows]);
  useEffect(() => {
    const fetchWord = async () => {
      axios
        .get("https://api.frontendexpert.io/api/fe/wordle-words", {
          headers: {
            "Contend-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": true,
          },
        })
        .then((response) => {
          const words = response.json();
          const SelectedWord = words[Math.floor(Math.random() * words.length)];
          setsolution(SelectedWord.toLowerCase());
        });
    };

    fetchWord();
  }, []);

  return (
    <div className="h-screen bg-gray-100 w-screen p-5 ">
      <h1 className="text-4xl font-medium text-center mx-auto text-gray-700">
        Wordle
      </h1>
      <div className=" flex flex-col gap-2 mx-auto mt-10">
        {rows.map((row, i) => {
          const isCurrentGuess = i === rows.findIndex((row) => row === null);
          return (
            <Line
              key={i}
              Guess={isCurrentGuess ? currentGuess : row || " "}
              solution={solution}
            />
          );
        })}
        {currentGuess}
      </div>
    </div>
  );
}

export default App;
