import { useEffect, useState } from "react";
import Box from "../Box";
import words from "../../words";
import goalWords from "../../goal_words";

const date = (new Date());
const day = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));


const correct =
  goalWords[Math.floor(day % goalWords.length)].toUpperCase();
let defaulBoard = [];
let defaultLetters = [];

"abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
  defaultLetters[i] = "";
});
const max_rows = (correct.length < 5)? 4:6;

for (let i = 0; i < max_rows; i++) {
  defaulBoard.push([]);
  for (let j = 0; j < correct.length; j++) {
    defaulBoard[i].push(["", ""]);
  }
}


function Board(props) {
  const [letters, setLetters] = useState(defaultLetters);
  const [board, setBoard] = useState(defaulBoard);
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (win || lost) {
      console.log("Terminado!");
    } else {
      if (props.clicks !== 0) {
        if (props.letter === "DEL") {
          setCol(col === 0 ? 0 : col - 1);
          setBoard((prevBoard) => {
            prevBoard[row][col === 0 ? 0 : col - 1][0] = "";
            return prevBoard;
          });
        } else {
          setBoard((prevBoard) => {
            if (col < correct.length) {
              if (props.letter !== "ENTER") {
                prevBoard[row][col][0] = props.letter;
                setCol(col + 1);
              } else {
                props.error("Faltan letras bro!");
                setTimeout(() => {
                  props.error("");
                }, 1000);
              }
            } else {
              if (props.letter === "ENTER") {
                let correctLetters = 0;
                let word = "";
                for (let i = 0; i < correct.length; i++) {
                  word += prevBoard[row][i][0];
                }
                if (words.includes(word.toLowerCase()) || correct.toLowerCase() == word.toLowerCase()) {
                  for (let i = 0; i < correct.length; i++) {
                    if (correct[i] === prevBoard[row][i][0]) {
                      prevBoard[row][i][1] = "C";
                      correctLetters++;
                    } else if (correct.includes(prevBoard[row][i][0]))
                      prevBoard[row][i][1] = "E";
                    else prevBoard[row][i][1] = "N";
                    setRow(row + 1);
                    if (row === max_rows-1) { // lose
                      setLost(true);
                      setTimeout(() => {
                        setMessage(`Era ${correct}!`);
                      }, 750);
                    }

                    setCol(0);
                    setLetters((prev) => {
                      prev[board[row][i][0]] = board[row][i][1];
                      return prev;
                    });
                  }
                  setChanged(!changed);

                  if (correctLetters === correct.length) {
                    setWin(true);
                    setTimeout(() => {
                      setMessage("Ganasteee");
                    }, 750);
                  }
                  return prevBoard;
                } else {
                  props.error("La palabra no está en el diccionario");
                  setTimeout(() => {
                    props.error("");
                  }, 1000);
                }
              }
            }
            return prevBoard;
          });
        }
      }
    }
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters);
  }, [changed]);

  return (
    <div className="px-10 py-5 grid gap-y-1 items-center w-100 justify-center">
      {board.map((row, key) => {
        return (
          <div key={key} className="flex gap-1 w-fit">
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        );
      })}
      <div className=" grid place-items-center h-8 font-bold dark:text-white">
        {lost || win ? message : ""}
      </div>
    </div>
  );
}

export default Board;
