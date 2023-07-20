import CurrentTrending from "./CurrentTrending"
import {db} from "../firebase/index"
import {collection,query,where,orderBy,getDocs, limit} from "firebase/firestore"
import { useEffect, useState } from "react"
const trendingData=[
  {text:"Does India have to change its PM"},
  {text:"Man killed his friend over company"},
  {text:"New Bugatti 2022"},
  {text:"Is there any COVID?"},
  {text:"Guess my Location"},
  {text:"Is 5 inch enough?"},
  {text:"New BTS Concert || Disscusion"},
  {text:"Justin new song opinion"},
  {text:"Is India growing?"},
  {text:"Shark tank India Review"},
  {text:"7.8 earthquake hit japan today AOT postponded"},
  {text:"Stock prices at all time high"}
  
]
const Trending=()=>{

  const [trending,setTrending]=useState([])

  const getTrending=async()=>{
    const q=query(collection(db,"posts"),orderBy("red","desc"),limit(10))
    const docSnap=await getDocs(q)
    let loadedData=[]
    docSnap.forEach((doc)=>{
    loadedData.push({...doc.data(),id:doc.id})
    })
    setTrending(loadedData)
    }

    useEffect(()=>{
      getTrending()
    },[])
    
  return(
    <div className="trending-post">
       <h2 class="trending-text">Trending</h2>
      <ul className="trending-list">
        {trending.map((i)=>{
          return(
          <CurrentTrending text={i.postHead} id={i.id}/>
          )
        })}
      </ul>
    </div>
  )
}
export default Trending