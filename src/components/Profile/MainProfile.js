import classes from "./MainProfile.module.css"
import { useHistory,Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
const MainProfile=(props)=>{
  const history=useHistory()
  const disptch=useDispatch()
  const userDetails=useSelector(state=>state.userDetails)
  const logoutHandler=()=>{
    disptch({type:"userDetails",value:null})
    props.loginHandler()
    history.replace('/home')
  }

  const feedBackHandler=()=>{
    history.push("/feedback")
  }

  return(
    <div className={classes['main-container']}>
     <Link to="/home">
      <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
      </Link>
      <img className={classes.img} src={userDetails.link} height={200} width={200}/>
      <div>
        <h1 className={classes.name}>{userDetails.name}</h1>
      </div>
      <button className={classes.btn} onClick={logoutHandler} >Logout</button><br/>
      <button className={classes.btn} onClick={feedBackHandler} >send Feedback</button>
    </div>
  )
}
export default MainProfile