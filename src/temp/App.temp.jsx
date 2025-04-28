import react, { useEffect, useState, useRef } from "react"

import Die from './components/die'
import "./App.css"

export default function App() {
  // let [isDieRollable, setDieRollableValue] = useState(true)
  // let [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 6) + 1)
  let [randomNumArr, setRandomNumArr] = useState(generateRandNumForDies())
  // let [disabledDieArr, setDisabledDieArr] = useState([])

  let disabledDieArr = []

  function generateRandNumForDies() {
    console.log("function running")
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

  function handleDieClick(id) {
    setRandomNumArr((prev) => {
      return prev.map((d) => {
        if (id === d.id) {
          disabledDieArr.push(d)
          return { ...d, isDieRollable: !d.isDieRollable, value: d.value }
        }
        return { ...d }
      })
    })
    // setDisabledDieArr(prev=> [...prev, id])
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


  let allDies = randomNumArr.map((d, i) => {
    return <Die key={`${i}-${Date.now()}`} dieData={d} handleDieClick={handleDieClick} />
  })

  // function heldDie(id) {
  //   setAllDies((prev)=>{
  //     let newArr = prev.map((o)=>{
  //       if (id===o.props.dieData.id) {
  //         // console.log(o.props.dieData.isRollable)
  //         return {...o, [o.props.dieData.isRollable]: !o.props.dieData.isRollable}
  //       }
  //       return {...o}
  //     })
  //     console.log(newArr)
  //     return newArr
  //   })
  //   console.log(allDies)
  // }

  return (
    <>
      <div className="container">
        {randomNumArr.map((d, i) => {
          return <Die key={`${i}-${Date.now()}`} dieData={d} handleDieClick={handleDieClick} />
        })}
      </div>

      <button onClick={rollAllDies}>Roll</button>
    </>
  )
}