import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import PostOpener from "../components/For-you/PostOpener"
import { db } from "../components/firebase"
import { query,collection,getDoc,getDocs, doc } from "firebase/firestore"
const Post=()=>{
  const param=useParams()
  const {postId}=param
  const [getPost,setGetPost]=useState({})


const getPostData=async()=>{
    const docRef=doc(db,"posts",postId)
    const docSnap=await getDoc(docRef)
    if(docSnap.exists()){
      setGetPost(docSnap.data())
    }
  }


  useEffect(()=>{
    getPostData()
  },[])
  
  return(
    <PostOpener id={getPost.id} name={getPost.name} details={getPost.postDetails} img={getPost.img} />
  )
}
export default Post