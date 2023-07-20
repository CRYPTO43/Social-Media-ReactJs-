import classes from "./ChatScreen.module.css"
import { db } from "../firebase"
import { query,collection,where, getDocs, doc ,getDoc} from "firebase/firestore"
import ChatInput from "./ChatInput"
import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


const ChatScreen=(props)=>{
const history=useHistory()
const dispatch=useDispatch()

const [chat,setChat]=useState([])
const [passData,setPassData]=useState({})
const intervalId=useSelector(state=>state.intervalId)
const userDetails=useSelector(state=>state.userDetails)



const getChat=async ()=>{
let userData=userDetails.userRef
let userSnapRef=doc(db,"users",userData)
const userSnap=await getDoc(userSnapRef)
let userId
if(userSnap.exists()){
userId=userSnap.data().userId
let passDataRef={
  sender:userId,
  receiver:props.userData.userId
}
setPassData(passDataRef)
}
  const q=query(collection(db,"chats"),where("userId","==",userId))
  const docSnap= await getDocs(q)
  let userChat
  docSnap.forEach((doc)=>{
   userChat=doc.data()
  })

 for (const key in userChat){
   if(key===props.userData.userId){
     setChat(userChat[key])
   }
 }
}

const refreshHandler=()=>{
  getChat()
}

const clickHandler=(event)=>{
  event.preventDefault()
  clearInterval(intervalId)
  history.push(`profile/${props.userData.userId}`)
}


useEffect(async()=>{
  const interval=setInterval(async()=>{
    await getChat()
  },1000)
  dispatch({type:"intervalId",value:interval})
},[])



  return(
    <div >
      <header onClick={clickHandler} className={classes['top-panel']}>
        <img className={classes.img} src={props.userData.img} height={65} width={65}/>
        <h3>{props.userData.name}</h3>
      </header>
      <main className={classes['main-container']}>
        {
          chat.map((i)=>{
            for(const key in i){
              if(key==="send"){
                return(
                 <p className={`${classes.send} ${classes.msg}`}>{i[key]}</p>
                ) 
              }else if(key==="received"){
                return(
                  <p className={`${classes.rec} ${classes.msg}`}>{i[key]}</p>
                ) 
              }
            }
          })
        }
      </main>
      <section>
      <ChatInput refresh={refreshHandler} chatData={passData}/>
      </section>
    </div>
  )
}
export default ChatScreen