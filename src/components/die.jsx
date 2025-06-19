export default function Die(props) {
  function heldDie(id) {
    props.handleDieClick(props.dieData.id)
  }
  return (
        <div className={`w-12 h-12 m-2 text-3xl/12 rounded text-teal-950 font-bold border text-center l  ${props.dieData.isDieRollable ? "bg-white" : "bg-green-300"}`} onClick={()=>{heldDie(props.dieData.id)}}>
          {props.dieData.value}
        </div>
    )
}