import { useEffect, useState } from "react"

export default function Die(props) {
  // let disabledDieArr = []

  function heldDie(id) {
    // console.log(id)
    props.handleDieClick(props.dieData.id)
    // disabledDieArr.push(id)
  }
  return (
        // <div className="die" onClick={() => heldDie(props.dieData.id)}>
        //     {isDieRollable ? props.dieData.value : null}
        //     {/* {dieData.value} */}
        // </div>

        <div className={ props.dieData.isDieRollable ? "die" : "disabledDie"} onClick={()=>{heldDie(props.dieData.id)}}>
          {props.dieData.value}
        </div>
    )
}