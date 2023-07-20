import "./Panel.css"
import Communities from "./Communities"
import { Fragment, useEffect, useState } from "react"
import {useSelector,useDispatch} from "react-redux"
import {db} from "../firebase/index"
import {query,collection, getDocs, orderBy} from "firebase/firestore"
let toClose


const Panel=(props)=>{
  const dispatch=useDispatch()
  const isCommunityOpen=useSelector(state=>state.isCommunityOpen)

  // uses state to show selected community on panel
  // using state to store all communities

  
const [isMenu,setIsMenu]=useState(false)
const[communities,setCommunities]=useState([])

// function which passes group id to container        passes from Communities passes to container

const groupHandler=(groupId)=>{
props.groupHandler(groupId)
}

// function which allows only selected community on panel


  const clickHandler=(menuId)=>{
    setIsMenu(!isMenu)
    dispatch({type:"toggle-community"})
    toClose=menuId
  }

// function that recieves data from communities to get which community to show on Panel   and passes to Container

  const checkHandler=(data,checkBool)=>{
    props.getData(data,checkBool)
  }


  // function that gets communities from firestore

  const getCommunities=async()=>{
    const q=query(collection(db,"communities"),orderBy("name"))
    const docSnap=await getDocs(q)
    let loadedCommunities=[]
    docSnap.forEach((doc)=>{
      loadedCommunities.push(doc.data())
    })
    setCommunities(loadedCommunities)
  }


  // using useEffect to call get Communities

useEffect(()=>{
  getCommunities()
},[])

  // to run if some community is clicked

  if(isCommunityOpen){
        return(
          <div className="panel">
          <ul className="communities-list">
            {communities.map((i)=>{
              if(i.id===toClose){
              return(
                <Fragment>
                  {localStorage.setItem("current_dir",i.name)}
                <Communities id={i.id} name={i.name} img={i.img} closingMenu={clickHandler} related={checkHandler} groupHandler={groupHandler} />
                </Fragment>
              )
              }
            })}
          </ul>
        </div>
        )
          }

          // to run if no Community is clicked or on initial stage

  else{
  return(
    <div className="panel">
      <ul className="communities-list">
        {communities.map((i)=>{
          return(
            <Fragment>
              {localStorage.removeItem("current_dir")}
              <Communities id={i.id} name={i.name} img={i.img} closingMenu={clickHandler} related={checkHandler} groupHandler={groupHandler} />
            </Fragment>   
          )
        })}
      </ul>
    </div>
   )
  } 
}
export default Panel