import {React, useState} from "react";
import './App.css';


export default function App() {
  let [player, setPlayer] = useState("x")
  let [moveList,setMoveList] =  useState([])
  let [square, setSquare] = useState(Array(9).fill(null))
  function NewMove(id)
  {
    moveList.push(<li><button key={moveList.length}>{player} clicked at square {id}.</button><br/></li>)
    setMoveList(moveList)
  }
  function UpdatePlayer(){player == "x"?setPlayer("o"):setPlayer("x")}
  const resetSquares = ()=>{
    setSquare(Array(9).fill(null))
    setMoveList([])
    setPlayer("x")
  }
  const updateElements = (id)=>{
    square[id]=player
      setSquare(square)
      NewMove(id)
      UpdatePlayer()
  }
  return (
    <div>
      <h1 className="text-center">tic tac toe</h1>
      <GameStatus playerToPlay={player} square={square}/>
      <Board updateElements={updateElements} square={square}/>
      <Sidebar moveList={moveList} resetSquares={resetSquares}/>
    </div>
  );
}

function GameStatus({playerToPlay, square})
{
  let status = `player to play : ${playerToPlay}`
  if (isGameOver(square))
    {
      status = `Gameover, winner : ${playerToPlay = playerToPlay=="x"? "o":"x"}`
      if (isGameOver(square)=="no-one")
      {
        status = `Gameover, winner : ${isGameOver(square)}`
      }
    }
  return <h3>{status}</h3>
}

function Square({updateElements, id, square})
{
  const squareClicked = ()=>{
    if (!(square[id]||isGameOver(square)))
    {
      updateElements(id)
    }
  }
  return (
    <div className="square" id={id} onClick={squareClicked}>{square[id]}</div>
  )
}

function Board({updateElements, square})
{
  let board = [];
  for (let i = 0; i<9; i++)
  {
    board.push(<Square key={i} id={i} updateElements={updateElements} square={square}/>)
  }
  return <div className="board">
    {board}
  </div>
}
  
function Sidebar({moveList, resetSquares})
{
  
  return(
    <div>
      <button onClick={resetSquares}>start the game</button>
      <ol>{moveList}</ol>
    </div>
  )
}

// backend logic
function isGameOver(arr)
{
  const lst = [[2,4,6],[0,4,8],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]]
  for (const [a,b,c] of lst)
  {
    if (arr[a] && arr[a] == arr[b] && arr[a] == arr[c])
    {
      console.log(`win squares ${a} ${b} ${c}`);
      return Boolean(1)
    }
  }
  for (const ele of arr)
  {
    if (ele == null)
    {
      return null
    }
  }
  return "no-one"
}