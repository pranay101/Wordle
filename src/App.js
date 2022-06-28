import { useEffect, useState } from "react";
import Line from "./Components/Line";

function App() {
  const [solution, setsolution] = useState("");
  const [rows, setRows] = useState(Array(6).fill(null));
  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(
        `https://api.frontendexpert.io/api/fe/wordle-words`
      );
      const words = response.json();
      const SelectedWord = words[Math.floor(Math.random() * words.length)];
      setsolution(SelectedWord);
    };

    fetchWord();
  }, []);

  return (
    <div className="h-screen bg-gray-100 w-screen p-5 ">
      <h1 className="text-4xl font-medium text-center mx-auto text-gray-700">
        Wordle
      </h1>
      <div className=" flex flex-col gap-2">
        {rows.map((row, i) => (
          <Line key={i} Guess={" "} solution={solution} />
        ))}
      </div>
    </div>
  );
}

export default App;
