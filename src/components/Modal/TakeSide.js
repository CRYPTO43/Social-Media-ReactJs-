import { Fragment } from "react";
import { useParams } from "react-router-dom";
import classes from "./TakeSide.module.css"
const TakeSide=(props)=>{
  const params=useParams()
  let{postId}=params

  const redHandler=()=>{
  userSideHandler({
    takenSide:"Red",
    postId:postId
  })
  }
  const greenHandler=()=>{
    userSideHandler({
      takenSide:"Green",
      postId:postId
    })
  }
  const neutralHandler=()=>{
    userSideHandler({
      takenSide:"Black",
      postId:postId
    })
  }
  const sideHandler=(data)=>{
    props.sideTaken(data)
  }


  async function userSideHandler(data){ 
    sideHandler(data.takenSide)
  }

  


  return(
    <Fragment>
   <div className={classes.backdrop}></div>
      <form className={classes['form-model']}>
      <h1 className={classes['main-text']}>Take a side</h1>
      <div className={classes['main-container']}>
        <div className={classes['outer']} onClick={redHandler} >
          <div className={`${classes.inner} ${classes.red}`}></div>
          <h1 className={classes.text}>Against</h1>
        </div>
        <div className={classes['outer']} onClick={greenHandler} >
          <div className={`${classes.inner} ${classes.green}`}></div>
          <h1 className={classes.text}>Agree</h1>
          </div>
        <div className={classes['outer']} onClick={neutralHandler} >
          <div className={`${classes.inner} ${classes.neutral}`}></div>
          <h1 className={classes.text}>Neutral</h1>
          </div>
      </div>
    </form>
    </Fragment>
    
  )
  }
  export default TakeSide