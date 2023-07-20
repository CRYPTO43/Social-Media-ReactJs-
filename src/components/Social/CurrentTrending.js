import React from "react"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const CurrentTrending=(props)=>{
const history=useHistory()
const dispatch=useDispatch()
  const clickHandler=()=>{
    dispatch({type:"toggle-post-opener"})
    history.push(`/post/${props.id}`)
  }

  return(
    <React.Fragment>
      <li className="current-trending" onClick={clickHandler}>
        {props.text}
      </li>
    </React.Fragment>
  )
}
export default CurrentTrending