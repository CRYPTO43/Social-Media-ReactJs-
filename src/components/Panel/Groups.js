import React, { useState } from "react"
import "./Panel.css"
import { useSelector,useDispatch } from "react-redux"
const Groups=(props)=>{
const isGroupOpen=useSelector(state=>state.isGroupOpen)


const clickHandler=()=>{ 
props.groupHandler(props.id)
props.showOnlyGroup(props.id)
localStorage.setItem("group-dir",props.id)

}
  return(
  <React.Fragment>
   <li className={`community ${isGroupOpen&&"highlight"}`} onClick={clickHandler} >
     <img
     class="group-img"
     src={props.img}
     alt=""
     height="45"
     width="45"
     />
   <span>{props.name}</span>
   </li>
   </React.Fragment>
  )
}
export default Groups