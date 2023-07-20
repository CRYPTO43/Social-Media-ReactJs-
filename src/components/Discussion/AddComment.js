import classes from "./AddComment.module.css"
import { useRef, useState } from "react"
import { useParams,useHistory } from "react-router-dom"
import useHttp from "../../hooks/use-http"
import { doc, increment, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useSelector,useDispatch } from "react-redux"
const AddComment=(props)=>{
  const params=useParams()
  const {postId}=params
  const [loading,setLoading]=useState(false)
  const userDetails=useSelector(state=>state.userDetails)
  const isSideTaken=useSelector(state=>state.isSideTaken)
  let commentData=useRef()
  const history=useHistory()
  const dispatch=useDispatch()


  const {sendRequest,isLoading,error}=useHttp({url:`https://start-up-3c286-default-rtdb.firebaseio.com/commentData/${postId}.json`,
  method:"POST"
})

  const submitHandler=async(event)=>{
    event.preventDefault()
    if(userDetails===null){
      history.push("/profile")
    }else if(!isSideTaken){
        dispatch({type:"sideTaken",value:true}) 
    }else{
      setLoading(true)
      let takenSide=localStorage.getItem("takenSide")
      let data={
        text:commentData.current.value,
        name:userDetails.name,
        link:userDetails.link,
        likes:0,
        dislikes:0,
        takenSide:takenSide,
        userId:userDetails.userId
      }
      commentData.current.value=''
      const docRef=doc(db,"posts",postId)
      if(takenSide==="Red"){
        await updateDoc(docRef,{
          red:increment(1)
        })
      }else if(takenSide==="Green"){
        await updateDoc(docRef,{
          green:increment(1)
        })
      }else if(takenSide==="Black"){
        await updateDoc(docRef,{
          black:increment(1)
        })
      }
      sendRequest(data)
      setLoading(false)
      props.refresh(Math.random())
    }
    
  }
  return(
    <form className={classes['add-comment']} onSubmit={submitHandler} >
      <input className={classes.input} type="text" placeholder="Enter comment" ref={commentData}/>
      <button className={classes.btn} type="submit" onClick={submitHandler}>{!isSideTaken ? "Choose" :loading?"Loading":"Add"}</button>
    </form>
  )
}
export default AddComment