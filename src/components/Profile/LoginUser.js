import classes from "./LoginUser.module.css"
import { Link,useHistory } from "react-router-dom"
import { useRef, useState } from "react"
import useHttp from "../../hooks/use-http"
import useUser from "../../hooks/use-user"
import { db } from "../firebase"
import { collection,getDoc,getDocs,query, where } from "firebase/firestore"
import { useSelector,useDispatch } from "react-redux"
const LoginUser=(props)=>{

const dispatch=useDispatch()

// uses state to get eneterd email useRef not works

const [email,setEmail]=useState("")
const emailHandler=(event)=>{
  setEmail(event.target.value)
}

const history=useHistory() 
const enteredEmail=useRef()
const enteredPassword=useRef()



// function that checks password after receving it from hooks

  const checkLogin=(user)=>{
        if(user.password===enteredPassword.current.value){
          dispatch({type:"userDetails",value:{name:user.name,userId:user.userId,link:user.link,userRef:user.id}})
          props.loginHandler()
          history.push('/home')
        }else{
          alert("Email/Password is incorrect")
        }
  }

// send request to hook with query to get only enetered email

  const {sendRequest,isLoading,error}=useUser({q:query(collection(db,'users'),where("email",'==',email))},checkLogin)
 

  // submits the query request to hook

    const submitHandler=(event)=>{
      event.preventDefault()
      sendRequest()
    }
  return(
    <form className={classes['main-body']} onSubmit={submitHandler} >
      <Link to="/home">
      <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
      </Link>
      <input className={classes.input} onChange={emailHandler} type="email" placeholder="Enter your email" ref={enteredEmail}/> <br/>
      <input className={classes.input} type="password" placeholder="Enter your password" ref={enteredPassword} /> <br/>
      <Link to="/new-user" className={classes.redirect}>
      Create Account
     </Link>
      <button className={classes.btn} type="submit" onClick={submitHandler}>{isLoading?"Loading":"Login"}</button>
    </form>
  )
}
export default LoginUser