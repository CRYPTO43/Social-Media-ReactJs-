import "./Social.css"
import Chat from "./Chat"
import Trending from "./Trending"
import { useSelector } from "react-redux"
import { db } from "../firebase"
import { getDoc,collection,doc, getDocs,query,where } from "firebase/firestore"
import { useEffect, useState } from "react"
let chatData={}
const Social=(props)=>{

// state that keps record of all following users to show them in chat

const [following,SetFllowing]=useState([])
const isChatOpen=useSelector(state=>state.isChatOpen)
const userDetail=useSelector(state=>state.userDetails)
const chatIsClicked=useSelector(state=>state.chatIsClicked)
// function that gets friends/following list of users

const getFriends=async ()=>{
let userDetails=userDetail.userRef
const userRef=doc(db,"users",userDetails)
const docSnap=await getDoc(userRef)
let following=[]


if(docSnap.exists()){
  following=docSnap.data().following
 }
SetFllowing(following)
}


// function call of getting friends/following data 

useEffect(async ()=>{
  await getFriends()
},[])

const clickHandler=(userId,name,img)=>{
props.chatHandler(userId,name,img)
chatData={
  img:img,
  name:name,
  userId:userId
}
}
if(isChatOpen){
  return(
    <div className="profile">
    <div className="chat-section">
      <ul className="chats">
          <Chat img={chatData.img} name={chatData.name} userId={chatData.userId} chatHandler={clickHandler}/>
      </ul>
    </div>
</div>
  )
}
if(!chatIsClicked){
  return(
    <div className="profile">
        <div className="chat-section">
          <ul className="chats">
            {following===undefined?"No friends":
            following.map((i)=>{
              return(
              <Chat img={i.link} name={i.name} userId={i.userId} chatHandler={clickHandler}/>
              )
            })}
          </ul>
        </div>
    </div>
  )
}
else{
  return(
    <div className="profile clear">
    <div className="chat-section">
<ul className="chats">
  <Trending/>
</ul>
</div>
</div>
  )
}
}
export default Social