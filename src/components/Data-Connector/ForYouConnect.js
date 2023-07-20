import ForYou from "../For-you/ForYou"
import { Fragment, useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import usePost from "../../hooks/use-post"
let filteredData=[] 
const ForYouConnect=(props)=>{
const dispatch=useDispatch()

// state which store all posts to be shown 
// Redux which stores the id of the community clicked to show all posts of that community 
// Redux which shows if a group is open or not
// Redux which stores id of a group clicked to get all posts of that group
// Redux which stores the community which was last clciked by user to be used again when user get back

const [allPost,setAllPost]=useState([])
const toShowPost=useSelector(state=>state.toShowPost)
const isGroupOpen=useSelector(state=>state.isGroupOpen)
const toShowCommunityPost=useSelector(state=>state.toShowCommunityPost)
const prevDir=useSelector(state=>state.prevDir)


// function that get posts from server and store them in a state

const transformedPosts=(postObj)=>{
  const loadedData=[]
  postObj.forEach((doc)=>{
    loadedData.push({...doc.data(),id:doc.id})
  })
  setAllPost(loadedData)
}

// api call to get posts from server

const {sendRequest,isLoading,error}=usePost({},transformedPosts)


// using useEffect to get data from server whenever data changes

useEffect(()=>{
  if(toShowPost===undefined){
    sendRequest(prevDir,"catogery")
    dispatch({type:"toShowPost",value:prevDir})
  }
  else if(isGroupOpen){
    sendRequest(toShowCommunityPost,"groupId")
  }else if(toShowPost==="friend"){
    sendRequest(true,"userId","getAll")
  }else{
  sendRequest(toShowPost,"catogery")
  }
},[toShowPost,toShowCommunityPost,isGroupOpen])


// function that passes the id of the post to be shown in post Opener


  const clickHandler=(id,bool)=>{
    props.openPost(id,bool)
  }


  // passing data from state to variable to be shown

  filteredData=allPost
 
  return(
    <Fragment>
      {isLoading?"Loading...":<ForYou data={filteredData} openPost={clickHandler}/>}
    </Fragment>
    
  )
}
export default ForYouConnect