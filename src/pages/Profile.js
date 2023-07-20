import MainProfile from "../components/Profile/MainProfile"
const Profile=(props)=>{
  return(
    <MainProfile loginHandler={props.clickHandler} />
  )
}
export default Profile