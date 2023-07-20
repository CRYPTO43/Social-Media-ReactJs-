import React, { useState } from "react"
import "./Suggestions.css"
import { useHistory } from "react-router-dom"
const Suggestions=(props)=>{
  const history=useHistory()
  const clickHandler=()=>{
    let clickedPostId=props.id
    props.postOpen(clickedPostId)
  }
  const userIdHandler=()=>{
    history.push(`/profile/${props.userId}`)
  }
  return(
    <React.Fragment>
          <div className="rank-main">
        <div class="head" onClick={userIdHandler} >
          <img className="for-you-img" src={props.img} alt="" width="35" height="35" />
          <div>
            <h4 className="for-you-post-name">{props.name}</h4>
          </div>
        </div>
        <div onClick={clickHandler} >
        <h3 className="post-head" >
          {props.postHead}
        </h3>
        <p className="post-details">
          {props.postDetails}
        </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Suggestions