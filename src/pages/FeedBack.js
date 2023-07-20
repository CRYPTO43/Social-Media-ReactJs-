import classes from "./FeedBack.module.css"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { db } from "../components/firebase"
import { addDoc,collection } from "firebase/firestore"
import { useHistory } from "react-router-dom"
const FeedBack=()=>{

const history=useHistory()
const enteredProb=useRef()  
const enteredFeed=useRef()



const submitHandler=async(event)=>{
  event.preventDefault()
  const data={
    title:enteredProb.current.value,
    problem:enteredFeed.current.value
  }

  console.log(data);

  await addDoc(collection(db,"Bugs"),data)
  history.push("/home")
}

  return(
       <form className={classes['main-body']} onSubmit={submitHandler} >
      <Link to="/home">
      <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
      </Link>
      <input className={classes.input} type="text" placeholder="Enter Problem" ref={enteredProb} /> <br/>
      <textarea className={`${classes.input} ${classes.area}`}  rows="10" cols="50" placeholder="Discription of problem" ref={enteredFeed}/> <br/>
      <button className={classes.btn} type="submit">Add</button>
    </form>
  )
}
export default FeedBack