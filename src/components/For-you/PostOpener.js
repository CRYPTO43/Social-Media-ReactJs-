import classes from "./PostOpener.module.css"
import { Link,useParams,useHistory } from "react-router-dom"
import Discussion from "../Discussion/Discussion"
import AddComment from "../Discussion/AddComment"
import { useEffect, useState } from "react"
import TakeSide from "../Modal/TakeSide"
import useHttp from "../../hooks/use-http"
import {useDispatch,useSelector } from "react-redux"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
const PostOpener=(props)=>{

  const dispatch=useDispatch()
  const history=useHistory()

  const isSideTaken=useSelector(state=>state.isSideTaken)
  const [refresh,setRefresh]=useState(0)
  const [rank,setRank]=useState({})
  const[sideTaken,setSideTaken]=useState(null)
  const params=useParams()
  const {postId}=params

const refreshHandler=(change)=>{
setRefresh(change)
sendRequest()
}

console.log(isSideTaken);

const sideHandler=(sideData)=>{
  setSideTaken(sideData)
  localStorage.setItem("takenSide",sideData)
}

const sideChangeHandler=()=>{
 dispatch({type:"sideTaken",value:true})
 setSideTaken(null)
}

const backHandler=()=>{
  dispatch({type:"toggle-post-opener"})
  history.replace("/home")
  dispatch({type:"sideTaken",value:false})
}

async function transformedRankData(rankObj){
  const docRef=doc(db,"posts",postId)
  const docSnap=await getDoc(docRef)
  let getRank
  if(docSnap.exists()){
    getRank=docSnap.data()
  }
  setRank(getRank)
}


const {sendRequest,isLoading,error}=useHttp({url:`https://start-up-3c286-default-rtdb.firebaseio.com/commentData/${postId}.json`},transformedRankData)


useEffect(()=>{
sendRequest()
},[])

  return(
    <div className={classes['post-detail-container']}>
      {isSideTaken&&!sideTaken&&<TakeSide sideTaken={sideHandler} />}
    <header className={classes['post-header']}>
      <img className={classes.back} onClick={backHandler} src="https://firebasestorage.googleapis.com/v0/b/start-up-3c286.appspot.com/o/root%2Fback-arrow.png?alt=media&token=a302cb92-1909-433f-833a-7050b079de9e"
       height={30}
       width={25}
       />
      <div className={classes['space-between']}>
      <div className={classes['secondary-container']}>
      <img className={classes['post-img']} src={props.img} height={80} width={80}/>
      <div className={classes['posted-details']}>
        <h3 className={classes['post-name']}>{props.name}</h3>
      </div>
      <div className={classes['third-contanier']}>
        <div className={classes.shell}>
        <p className={classes.Red}></p>
        <h3 className={classes['rank-dot-name']}>{rank.red}</h3>
        </div>
        <div className={classes.shell}>
        <p className={classes.Green}></p>
        <h3 className={classes['rank-dot-name']}>{rank.green}</h3>
        </div>
        <div className={classes.shell}>
        <p className={classes.Black}></p>
        <h3 className={classes['rank-dot-name']}>{rank.black}</h3>
        </div>    
      </div>
      </div>
      <div className={classes["fourth-container"]}>
        <h2 className={classes['side-text']} onClick={backHandler}>Current side</h2>
        <p className={classes[`${sideTaken}`]}></p>
        <span className={classes['change-btn']} onClick={sideChangeHandler}>Change</span>
      </div>
      </div>
    </header>
    <section>
      <div className={classes['post-question']}>
        <p>{props.details}</p>
      </div>
    </section>
    <section>
      <Discussion refresh={refresh} id={props.id} />
      <AddComment refresh={refreshHandler} id={props.id} />
    </section>
    </div>
  )
}
export default PostOpener