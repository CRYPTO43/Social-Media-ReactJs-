import { Fragment, useState } from "react"
import Header from "../components/Header/Header"
import Container from "../Container"
const Home=()=>{
  const[isChatOpen,setIsChatOpen]=useState()
  const clickHandler=(isOpen)=>{
    setIsChatOpen(isOpen)
  }
  return(
    <Fragment>
    <Header openChat={clickHandler}/>
    <Container openChatMenu={isChatOpen} />
    </Fragment>
  )
}
export default Home