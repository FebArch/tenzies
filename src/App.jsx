import react, { useEffect, useState, useRef } from "react"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"

import Die from './components/die'
import "./tailwind.css"

export default function App() {

  const { width, height } = useWindowSize()
  let [randomNumArr, setRandomNumArr] = useState(generateRandNumForDies())

  function generateRandNumForDies() {
    let newArr = []

    for (let j = 0; j < 10; j++) {
      newArr.push({
        id: j,
        value: Math.floor(Math.random() * 6) + 1,
        isDieRollable: true
      })
    }
    return newArr
  }

  function rollAllDies() {
    setRandomNumArr((prev) => {
      return prev.map((d) => {
        if (d.isDieRollable) {
          return {
            ...d,
            value: Math.floor(Math.random() * 6) + 1,
          }
        }
        return d
      })
    })
  }

  function handleDieClick(id) {
    setRandomNumArr((prev) => {
      return prev.map((d) => {
        if (id === d.id) {
          return { ...d, isDieRollable: false }
        }
        return d
      })
    })
  }

  const allDies = randomNumArr.map((d, i) => {
    return <Die key={`${i}-${Date.now()}`} dieData={d} handleDieClick={handleDieClick} />
  })

  let isAllDiesFreeze = allDies.every((e) => {
    return (e.props.dieData.isDieRollable === false)
  })


  if (isAllDiesFreeze) {


  }

  console.log(isAllDiesFreeze)

  function resetGame() {
    setRandomNumArr(generateRandNumForDies())
  }

  return (
    <div className="h-[60vh] w-[95vw] sm:w-[45vw] bg-cyan-900 px-4 border rounded text-teal-100 flex flex-col justify-evenly items-center">
      <h1 className="text-4xl">Tenzies</h1>

      {isAllDiesFreeze && <div>{
        allDies.every((e) => e.props.dieData.value === allDies[0].props.dieData.value) ?
          <h2>
            <Confetti />
            🎉 Congratulations! You won the game 🎉
          </h2>
        : <h2>😭 Game Over! Sorry you lost the game 😭</h2>
      }</div>}

      <p className="text-center">Roll until all dies are same. Click each die  to freeze it at it's current value between dies</p>
      <div className="w-85 h-40 cursor-pointer select-none rounded bg-teal-100 flex flex-wrap justify-evenly items-center border">
        {allDies}
      </div>

      {(isAllDiesFreeze) ?
        <button className="border px-5 py-2 text-lg rounded active:bg-teal-100 active:text-teal-950 cursor-pointer md:hover:bg-teal-200 md:hover:text-teal-800" onClick={resetGame}>New Game</button> :
        <button className="border px-5 py-2 text-lg rounded active:bg-teal-100 active:text-teal-950 cursor-pointer md:hover:bg-teal-200 md:hover:text-teal-800" onClick={rollAllDies}>Roll</button>}

    </div>
  )
}