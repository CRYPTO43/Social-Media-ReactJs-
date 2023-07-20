import {Route,Switch,Redirect} from "react-router-dom"
import Home from "./pages/Home"
import Post from "./pages/Post"
import NewPost from "./pages/NewPost"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import CreateUser from "./pages/CreateUser"
import { useState } from "react"
import UserDetails from "./pages/UserDetails"
import NewGroup from "./pages/NewGroup"
import NewCommunity from "./pages/NewCommunity"
import FeedBack from "./pages/FeedBack"
const App=()=>{
  const [loggedIn,setLoggedIn]=useState(false)
  const loginHandler=()=>{
    setLoggedIn(!loggedIn)
  }
  return(
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home"/>
      </Route>
      <Route path="/home" exact>
      <Home/>
      </Route> 
      <Route path="/post/:postId" exact>
        <Post/>
      </Route>
      <Route path="/new-post" exact>
        <NewPost/>
      </Route>
      <Route path="/new-user" exact>
        <CreateUser/>
      </Route>
      <Route path="/profile" exact>
        {loggedIn&&<Profile clickHandler={loginHandler} />}
        {!loggedIn&&<Login clickHandler={loginHandler} />}
      </Route>
      <Route path="/profile/:userId" exact>
        <UserDetails/>
      </Route>
      <Route path="/new-group" exact>
        <NewGroup/>
      </Route>
      <Route path="/new-community" exact>
        <NewCommunity/>
      </Route>
      <Route path="/feedback" exact>
        <FeedBack/>
      </Route>
    </Switch>
  )
}
export default App