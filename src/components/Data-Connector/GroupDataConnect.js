import React, { Fragment, useEffect, useState } from "react"
import Groups from "../Panel/Groups"
import useHttp from "../../hooks/use-http"
import {useSelector,useDispatch} from "react-redux"
let reactor=0
let groupData

// function that refreshes the useEffect to shows added group after adding

  const reFetch=()=>{
    reactor=Math.random()
  }

  
const GroupDataConnect=(props)=>{
  const dispatch=useDispatch()
  const showOnlyGroupRefresh=useSelector(state=>state.showOnlyGroup)
  const isChatOpen=useSelector(state=>state.isChatOpen)
  const [getData,setGetData]=useState([])


  const clickHandler=(groupId)=>{
    props.groupHandler(groupId)
    }
    const showOnlyGroupHandler=(groupId)=>{
      if(!isChatOpen){
        dispatch({type:"show-onlyGroup"})
        groupData=groupId
      }
    }
    


  const transformedGroupData=(groupObj)=>{
    const loadedData=[]
    for(const key in groupObj){
      loadedData.push({
        id:key,
        category:groupObj[key].category,
        name:groupObj[key].name,
        img:groupObj[key].img
      })
    }
    setGetData(loadedData) 
  }

  const {sendRequest,isLoading,error}=useHttp({url:"https://start-up-3c286-default-rtdb.firebaseio.com/data.json"},transformedGroupData)

  useEffect(()=>{
    sendRequest()
  },[reactor])
  
  if(showOnlyGroupRefresh){
    return(
      <Fragment>
      { getData.map((i)=>{
          if(i.id===groupData){
            return(
              <Groups name={i.name} img={i.img} id={i.id} groupHandler={clickHandler} showOnlyGroup={showOnlyGroupHandler} />
            )
          }
        })
      }
      </Fragment>
    )
  }else{
    return(
      <React.Fragment>
        {getData.map((i)=>{
          if(props.name===i.category){
            return(
            <Groups name={i.name} img={i.img} id={i.id} groupHandler={clickHandler} showOnlyGroup={showOnlyGroupHandler} />
            )
          }
        })}  
      </React.Fragment>
    )
  }
}
export default GroupDataConnect
export {reFetch}