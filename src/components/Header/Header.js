import React, { useState } from "react"
import { Redirect,useHistory } from "react-router-dom"
import "./Header.css"
import AddGroup from "../Modal/AddGroup"
import { useDispatch,useSelector } from "react-redux"
const Header=(props)=>{
  const history=useHistory()
  const dispatch=useDispatch()
  const [isClicked,setIsClicked]=useState(true)
  const intervalId=useSelector(state=>state.intervalId)
  const isGroupOpen=useSelector(state=>state.isGroupOpen)
  const isCommunityOpen=useSelector(state=>state.isCommunityOpen)
  const userDetails=useSelector(state=>state.userDetails)
  const chatIsClicked=useSelector(state=>state.chatIsClicked)

  const clickHandler=()=>{
    setIsClicked(!isClicked)
    dispatch({type:"openChatMenu"})
    sendClickBack()
  }
  const AddDetails=()=>{
  clearInterval(intervalId)
  history.push("/new-group")
  }
  const addPostHandler=()=>{
    clearInterval(intervalId)
    history.push("/new-post")
  }
  const profileHandler=()=>{
    clearInterval(intervalId)
    history.push('/profile')
  }

  const addCommunityHandler=()=>{
    clearInterval(intervalId)
    history.push("/new-community")
  }

 const sendClickBack=()=>{(props.openChat(isClicked))}
  return(
    <React.Fragment>
    <header>
      <h1 class="logo">STARTUP</h1>
      <div class="personal">
        <ul class="personal-details">
          {userDetails!==null&&userDetails.userId==="722675"&&<li>
            <button className="btn-post" onClick={addCommunityHandler}>Create community</button>
          </li>}
        {isGroupOpen&&<li>
          <button className="btn-post" onClick={addPostHandler}>Add post</button>
        </li>}
          {isCommunityOpen&&!isGroupOpen&&<li>
            <button className="btn-post" onClick={AddDetails}>Create Group</button>
          </li>}
          <li>
            <img
              class="profile-icon"
              src="./images/icons8-shopping-bag-24.png"
              alt=""
              height="30"
              width="30"
            />
          </li>
          <li>
            <img
              class="profile-icon"
              src="./images/man.svg"
              alt=""
              height="30"
              width="30"
              onClick={profileHandler}
            />
          </li>
          <li onClick={clickHandler} className={chatIsClicked? "clicked":"null"} >
            <img src="./images/chat.png" alt=""
            class="profile-icon chat-toggler"
            height="30"
            width="30"></img>
          </li>
        </ul>
      </div>
    </header>
    </React.Fragment> 
  )
}

export default Header