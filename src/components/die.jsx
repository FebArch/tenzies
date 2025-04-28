export default function Die(props) {
  function heldDie(id) {
    props.handleDieClick(props.dieData.id)
  }
  return (
        <div className={ props.dieData.isDieRollable ? "die" : "disabledDie"} onClick={()=>{heldDie(props.dieData.id)}}>
          {props.dieData.value}
        </div>
    )
}