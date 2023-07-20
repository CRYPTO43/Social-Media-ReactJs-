import { useRef, useState } from "react"
import classes from "./ChatInput.module.css"
import { db } from "../firebase"
import { collection, doc, getDocs, query, updateDoc, where,arrayUnion } from "firebase/firestore"
const ChatInput=(props)=>{
let enteredMsg=useRef()
const [loading,setLoading]=useState(false)

  const submitHandler= async (event)=>{
    event.preventDefault()
    setLoading(true)
    let q=query(collection(db,"chats"),where("userId","==",props.chatData.receiver))
    const docSnap=await getDocs(q)
    let receiverRef
    let receiverChat
    docSnap.forEach((doc)=>{
      receiverRef=doc.id
      receiverChat=doc.data()
    })
    q=query(collection(db,"chats"),where("userId","==",props.chatData.sender))
    const sender=await getDocs(q)
    let senderRef
    let senderChat
    sender.forEach((doc)=>{
      senderRef=doc.id
      senderChat=doc.data()
    })
    
    const sendToReceiverRef=doc(db,"chats",receiverRef)
    const sendToSenderRef=doc(db,"chats",senderRef)

    let senderUserId=props.chatData.receiver
    let receiverUserId=props.chatData.sender
   
    if(!senderChat[senderUserId]){
      updateDoc(sendToSenderRef,{
        [senderUserId]:[{send:enteredMsg.current.value}]
      })
    }else{
      for(const key in senderChat){
        if(key===senderUserId){
          let prevData=senderChat[key]
          updateDoc(sendToSenderRef,{
            [key]:[...prevData,{send:enteredMsg.current.value}]
          })
        }
      }
    }

    if(!receiverChat[receiverUserId]){
      updateDoc(sendToReceiverRef,{
        [receiverUserId]:[{received:enteredMsg.current.value}]
      })
    }else{
      for(const key in receiverChat){
        if(key===receiverUserId){
          let prevData=receiverChat[key]
          updateDoc(sendToReceiverRef,{
            [key]:[...prevData,{received:enteredMsg.current.value}]
          })
        }
      }
    }
    enteredMsg.current.value=""
    setLoading(false)
    props.refresh()

  }



  return(
    <form onSubmit={submitHandler} className={classes.form}>
      <input className={classes.input} type= "text" placeholder="Enter Message" ref={enteredMsg}/>
      <button type="submit" className={classes.btn}>{loading?"Sending...":"Send"}</button>
    </form>
  )
}
export default ChatInput