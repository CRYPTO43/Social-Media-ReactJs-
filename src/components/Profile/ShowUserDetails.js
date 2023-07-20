import { useParams,useHistory } from "react-router-dom"
import classes from "./ShowUserDetails.module.css"
import { Link } from "react-router-dom"
import {db} from "../firebase/index"
import {getDocs,collection,getDoc,doc,query, where,addDoc,updateDoc, arrayUnion} from "firebase/firestore"
import {  useState,useEffect } from "react"
import { useSelector } from "react-redux"
const ShowUserDetails=()=>{

  const userDetails=useSelector(state=>state.userDetails)

// use state to show any visited profile details

  const [user,setUser]=useState({})
  const [visitedUserRef,setVisitedUserRef]=useState()
  const [visitedUserFriends,setVisitedUserFriends]=useState()
  const [isClicked,setIsClicked]=useState(false)
  const[friend,setFriend]=useState(false)
  const params=useParams()
  const history=useHistory()
  const{userId}=params
  let toChange
  if(userDetails===null){
    history.push('/profile')
  }else{
     toChange=userDetails.userRef
  }
  


// function that gets visited profile details from fireStore and also check if profile visited is not the logged in user 

  const userDetailHandler=async()=>{
    const q=query(collection(db,"users"),where("userId","==",userId))
    const data=await getDocs(q)
    let frnds
    data.forEach((doc)=>{
      setUser(doc.data())
      setVisitedUserRef(doc.id)
      setVisitedUserFriends(doc.data().following)
      frnds=doc.data().following
    })
    const sameUserRef=doc(db,"users",toChange)
    const docSnap=await getDoc(sameUserRef)
    let sameUserId
    if(docSnap.exists()){
      sameUserId=docSnap.data().userId
    }
   let isFriend=false
   if(frnds===undefined){
     
   }else{
    frnds.map((i)=>{
      if(i.userId===sameUserId){
        setFriend(true)
        isFriend=true
      }
    })
   }
    
    if(!isFriend){
      setIsClicked(true)
    }
    if(sameUserId===userId){
      history.push("/profile")
    }
  }


// function that add followers to logged in user following array

  const followHandler=async ()=>{
    if(isClicked===false){
      return
    }else{
      setIsClicked(false)
      console.log(visitedUserRef,visitedUserFriends);
      const q=query(collection(db,"users"),where("userId","==",userId))
      const userSnap=await getDocs(q)
      let followedUserData
      userSnap.forEach((doc)=>{
        followedUserData={name:doc.data().name,link:doc.data().link,userId:doc.data().userId}
      })
      const prevDataRef=doc(db,"users",toChange)
      const docSnap=await getDoc(prevDataRef)
      let prevData
      let loggedUserData
      if(docSnap.exists()){
        prevData=docSnap.data().following
        loggedUserData={
          name:docSnap.data().name,
          link:docSnap.data().link,
          userId:docSnap.data().userId
        }
      }
      if(prevData===undefined){
        const updateRef=doc(db,"users",toChange)
        await updateDoc(updateRef,{
        following:[followedUserData]
      })
      }else{
        const updateRef=doc(db,"users",toChange)
        await updateDoc(updateRef,{
          following:arrayUnion(followedUserData)
        })
      }
  
      if(visitedUserFriends===undefined){
        const updateRef=doc(db,"users",visitedUserRef)
        await updateDoc(updateRef,{
          following:[loggedUserData]
        })
      }else{
        const updateRef=doc(db,"users",visitedUserRef)
        await updateDoc(updateRef,{
          following:arrayUnion(loggedUserData)
        })
      }
      userDetailHandler()
    }
  }

// function call to get visited profile details

 
useEffect(()=>{
  userDetailHandler()
},[])


  return(
    <div className={classes['main-container']}>
     <Link to="/home">
      <img className={classes.back}  src="https://firebasestorage.googleapis.com/v0/b/start-up-3c286.appspot.com/o/root%2Fback-arrow.png?alt=media&token=a302cb92-1909-433f-833a-7050b079de9e" height={30} width={25}/>
      </Link>
      <img className={classes.img} src={user.link}  height={200} width={200}/>
      <div>
        <h1 className={classes.name}>{user.name}</h1>
        <button onClick={followHandler} className={classes.btn}>{friend?"Added":"Add Friend"}</button>
      </div>
    </div>
  )
}
export default ShowUserDetails