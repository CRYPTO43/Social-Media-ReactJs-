import React, { useContext, useState } from "react"
import "./Panel.css"
import GroupDataConnect from "../Data-Connector/GroupDataConnect"
import {useSelector,useDispatch} from "react-redux"
let suggestionData
const Communities=(props)=>{
const dispatch=useDispatch()
const showGroupsRefresh=useSelector(state=>state.showGroupsRefresh)
const isChatOpen=useSelector(state=>state.isChatOpen)


  // uses redux state to hide main community to keep it unaccessable

const hideCommunity=useSelector(state=>state.hideCommunity)

// passes group id to container to show group posts on for-you      passes from groupDataConnect passes to Panel

const clickHandler=(groupId)=>{
  if(!isChatOpen){
    props.groupHandler(groupId)
    dispatch({type:"hideOtherCommunity"})
  }
  
}

// uses state to highlight the selected group and to show only clicked community in panel

const [isClose, setIsClose]=useState(true)


//props function to show only community in for-you and also checks if chat is open to make panel unaccessable

 const closingHandler=()=>{
   if(!isChatOpen){
    dispatch({type:"onRefreshGroupData"})
    props.closingMenu(props.id)
    dispatch({type:"toShowCommunityPost",value:null})
   }
    

    // sends name of the community to be shown to panel and also checks if chat is open to make panel unaccessable

    suggestionData=props.name
    props.related(suggestionData,showGroupsRefresh)
  }



  return( 
    <React.Fragment>
      <li className={`community ${showGroupsRefresh?"null":"highlight"} ${hideCommunity&&"to-close"}`} onClick={closingHandler}>
      <img
      src={props.img}
      alt="cars"
      class="group-img"
      height="50"
      width="50"
      />
       <span>{props.name}</span>
      </li>
      <div className={`tag ${showGroupsRefresh ? "to-close": "null"}`}>
      <ul className="communities-list">
      {!showGroupsRefresh&& <GroupDataConnect name={props.name} groupHandler={clickHandler} />}
      </ul>
      </div>
    </React.Fragment>
  )
}
export default Communities