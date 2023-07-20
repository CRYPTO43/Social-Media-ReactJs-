import LoginUser from "../components/Profile/LoginUser";
const Login=(props)=>{
  return(
    <LoginUser loginHandler={props.clickHandler} />
  )
}
export default Login