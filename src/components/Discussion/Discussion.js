import { useEffect, useState } from "react"
import { useParams,useHistory } from "react-router-dom"
import classes from "./Discussion.module.css"
import useHttp from "../../hooks/use-http"
import { Grid } from "@mui/material"
const Discussion=(props)=>{

  let counter=0;
  let style=3;


const[getComment,setGetComment]=useState([])
const params=useParams()
const {postId}=params
const history=useHistory()




  const transformedComments=(commentObj)=>{
    const loadedData=[]
    for(const key in commentObj){
      loadedData.push({
        text:commentObj[key].text,
        name:commentObj[key].name,
        takenSide:commentObj[key].takenSide,
        link:commentObj[key].link,
        userId:commentObj[key].userId
      })
    }
    setGetComment(loadedData)
  }

  const {sendRequest,isLoading,error}=useHttp({url:`https://start-up-3c286-default-rtdb.firebaseio.com/commentData/${postId}.json`},transformedComments)


useEffect(()=>{
  sendRequest()
},[props.refresh]) 

  return(
    <div className={classes['discussion-battle']}> 
       {isLoading?"Loading": <Grid container className={classes['comment-layout']} columns={20}>
          {getComment.map((i)=>{
            let taken=i.takenSide
              if(counter%4==0){
                {counter++}
                return(
                <Grid item md={13} >
                <li className={classes.comments}>
              <div onClick={()=>{history.push(`/profile/${i.userId}`)}} className={classes['comment-detail']}>
              <img className={classes.image} src={i.link} height={50} width={50}/>
              <p>{i.name}</p>
              <div className={classes['user-side']}>
                {taken==="Red"&&<div className={`${classes.side} ${classes.red}`}></div>}
                {taken==="Black"&&<div className={`${classes.side} ${classes.black}`}></div>}
                {taken==="Green"&&<div className={`${classes.side} ${classes.green}`}></div>}
              </div>
              </div>
              <p className={classes['comment-text']}>{i.text}</p>
              </li>
              </Grid>
                )
              }
              else if(counter===style){
                {counter++}
                {style+=4}
                return(
                  <Grid  item md={13} >
                  <li className={classes.comments}>
                <div onClick={()=>{history.push(`/profile/${i.userId}`)}} className={classes['comment-detail']}>
                <img className={classes.image} src={i.link} height={50} width={50}/>
                <p>{i.name}</p>
                <div className={classes['user-side']}>
                  {taken==="Red"&&<div className={`${classes.side} ${classes.red}`}></div>}
                  {taken==="Black"&&<div className={`${classes.side} ${classes.black}`}></div>}
                  {taken==="Green"&&<div className={`${classes.side} ${classes.green}`}></div>}
                </div>
                </div>
                <p className={classes['comment-text']}>{i.text}</p>
                </li>
                </Grid>
                )
             }
             else if(counter%4!==0){
              {counter++}
            return(
              <Grid item md={6} >
              <li className={classes.comments}>
            <div onClick={()=>{history.push(`/profile/${i.userId}`)}} className={classes['comment-detail']}>
            <img className={classes.image} src={i.link} height={50} width={50}/>
            <p>{i.name}</p>
            <div className={classes['user-side']}>
              {taken==="Red"&&<div className={`${classes.side} ${classes.red}`}></div>}
              {taken==="Black"&&<div className={`${classes.side} ${classes.black}`}></div>}
              {taken==="Green"&&<div className={`${classes.side} ${classes.green}`}></div>}
            </div>
            </div>
            <p className={classes['comment-text']}>{i.text}</p>
            </li>
            </Grid>
            )}
          })}
       </Grid>}
    </div>
  )
}
export default Discussion