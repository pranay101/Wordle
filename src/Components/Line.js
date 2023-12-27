import React from "react";

const Line = ({ Guess, solution, isFinal }) => {
  const tiles = [];
  let className = [" border h-16 w-16 border-black flex justify-center items-center text-xl uppercase font-bold"];
  const correct = " bg-green-600";
  const partiallyCorrect = " bg-yellow-600";
  const inCorrect = " bg-gray-600";

  for (let i = 0; i < 5; i++) {
    if (isFinal) {
      console.log(Guess[i],solution[i]);
      if (Guess[i] === solution[i]) {
        className.push(correct);
      }
      if (solution.includes(Guess[i])) {
        className.push(partiallyCorrect);
      } else {
        className.push(inCorrect);
      }
    }
    console.log(className);
    tiles.push(
      <div key={i} className={className.join(" ")}>
        {Guess[i]}
      </div>
    );
  }
  return <div className="flex gap-2 mx-auto ">{tiles}</div>;
};

export default Line;
