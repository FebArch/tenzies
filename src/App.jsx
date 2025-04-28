import react, { useEffect, useState, useRef } from "react"

import Die from './components/die'
import "./App.css"

export default function App() {

  let [randomNumArr, setRandomNumArr] = useState(generateRandNumForDies())
  let [winGame, setWinGame] = useState(false)

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
        return { ...d }
      })
    })
  }

  function handleDieClick(id) {
    setRandomNumArr((prev) => {
      return prev.map((d) => {
        if (id === d.id) {
          return { ...d, isDieRollable: false, value: d.value }
        }
        return { ...d }
      })
    })
  }
  
  const allDies = randomNumArr.map((d, i) => {
    return <Die key={`${i}-${Date.now()}`} dieData={d} handleDieClick={handleDieClick} />
  })

  useEffect(()=>{
    let isAllDiesFreeze = allDies.every((e)=>{
      return (e.props.dieData.isDieRollable === false) ? true : false
    })

    let isAllDiesValueSame = allDies.every((e)=>{
      return (e.props.dieData.value === allDies[0].props.dieData.value) ? true : false
    })

    if (isAllDiesFreeze && isAllDiesValueSame) {
      setWinGame(true)
    }

  }, [allDies])

  function resetGame(){
    setWinGame(false)
    setRandomNumArr(generateRandNumForDies())
  }

  return (
    <>
    <h1>Tenzies</h1>
    <p>Roll until all dies are same. Click each die  to freeze it at it's current value between dies</p>
      <div className="container">
        {allDies}
      </div>

      {(winGame) ? 
      <button onClick={resetGame}>New Game</button> : 
      <button onClick={rollAllDies}>Roll</button>}
      
    </>
  )
}