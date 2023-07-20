import React from "react"
import { useSelector } from "react-redux"
const Chat=(props)=>{
const isChatOpen=useSelector(state=>state.isChatOpen)
const clickHandler=()=>{
  props.chatHandler(props.userId,props.name,props.img)
}
return(
  <React.Fragment>
    <li onClick={clickHandler} className={`chat ${isChatOpen&&"highlight"}`}>
    <img
      src={props.img}
      alt=""
      height="50"
      width="50"
      class="friends"
     />
      <span className="chat-name">{props.name}</span>
    </li>
  </React.Fragment>
)
}
export default Chat