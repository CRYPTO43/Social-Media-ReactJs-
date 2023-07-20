import { Fragment,useRef,useState } from "react"
import classes from "./AddCommunity.module.css"
import { Link,useHistory } from "react-router-dom"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage,db } from "../firebase";
import { collection,addDoc } from "firebase/firestore";
import useHttp from "../../hooks/use-http"
const AddCommunity=()=>{
  const [progress,setProgress]=useState(0)
  const enteredCommunity=useRef()
  const history=useHistory()
  const [loading,setLoading]=useState(false)
  const {sendRequest,isLoading,error}=useHttp({url:"https://start-up-3c286-default-rtdb.firebaseio.com/communityData.json",
  method:"POST"
})

  const fileUpload=async(file,data)=>{
    const sotrageRef = ref(storage, `files/communities/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          let toSendData={
            ...data,
            img:downloadURL
          }
          await addDoc(collection(db,"communities"),toSendData)
          setLoading(false)
          history.push("/home")
        });
      }
    );
  }


const submitHandler=(event)=>{
event.preventDefault()
setLoading(true)
const file=event.target[0].files[0]
const data={
  name:enteredCommunity.current.value,
  id:Math.floor(Math.random()*1000000)
}
fileUpload(file,data)
}


return(
  <Fragment>
     <form className={classes['main-body']} onSubmit={submitHandler} >
      <Link to="/home">
      <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
      </Link>
      <label className={classes.label} >Choose a Community picture</label>
      <input className={classes.input} type="file" placeholder="Choose"/> <br/>
      <textarea className={`${classes.input} ${classes.area}`}  rows="10" cols="50" placeholder="Enter Community Name" ref={enteredCommunity}/> <br/>
      <button className={classes.btn} type="submit">{loading?"Loading":"Add"}</button>
    </form>
  </Fragment>
)
}
export default AddCommunity