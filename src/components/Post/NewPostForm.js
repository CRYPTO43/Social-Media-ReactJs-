import classes from "./NewPostForm\.module.css"
import { Link,useHistory } from "react-router-dom"
import { useRef, useState } from "react"
import useHttp from "../../hooks/use-http"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { useSelector } from "react-redux"
const NewPostForm=()=>{
const userDetails=useSelector(state=>state.userDetails)
const [loading,setLoading]=useState(false)
let community=localStorage.getItem("current_dir")
let groupDir=localStorage.getItem("group-dir")

  const history=useHistory()
  let enteredCommunity=useRef()
  let enteredHead=useRef()
  let enteredPost=useRef()


  const submitHandler=async(event)=>{
    event.preventDefault()
    setLoading(true)
    if(userDetails===null){
      history.push('/profile')
    }else{
      let data={
        catogery:community,
        img:userDetails.link,
        id:Math.floor(Math.random()*1000000),
        groupId:groupDir,
        name:userDetails.name,
        postHead:enteredHead.current.value,
        postDetails:enteredPost.current.value,
        userId:userDetails.userId,
        red:0,
        green:0,
        black:0
      } 
  
      await addDoc(collection(db,"posts"),data)
      setLoading(false)
      history.push('/home')
    }
    
  }
  return(
    <form className={classes['main-body']} onSubmit={submitHandler} >
      <Link to="/home">
      <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
      </Link>
      <input className={classes.input} type="text" placeholder="Enter Post head" ref={enteredHead} /> <br/>
      <textarea className={`${classes.input} ${classes.area}`}  rows="10" cols="50" placeholder="Enter post" ref={enteredPost}/> <br/>
      <button className={classes.btn} type="submit">{loading?"Loading":"Add"}</button>
    </form>
  )
}
export default NewPostForm