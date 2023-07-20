import React, { useState,useRef } from "react"
import useHttp from "../../hooks/use-http"
import { reFetch } from "../Data-Connector/GroupDataConnect"
import classes from "./AddGroup.module.css"
import { Link,useHistory } from "react-router-dom"
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const AddGroup=(props)=>{
  const [loading,setLoading]=useState(false)
  let enteredCommunity=localStorage.getItem("current_dir")
  let enteredgroup=useRef()
  const [progress,setProgress]=useState(0)
  const history=useHistory()
  const {sendRequest,isLoading,error}=useHttp({url:"https://start-up-3c286-default-rtdb.firebaseio.com/data.json",
  method:"POST"
})


const fileUpload=(file,data)=>{
  const sotrageRef = ref(storage, `files/groups/${file.name}`);
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
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        let toSendData={
          ...data,
          img:downloadURL
        }
        sendRequest(toSendData)
        console.log(toSendData);
        reFetch()
        setLoading(false)
        history.push("/home")
      });
    }
  );
}

  
  const submitHandler=(event)=>{
    event.preventDefault()
    setLoading(true)
    let data={
      category:enteredCommunity, 
      name:enteredgroup.current.value
    }
   const file=event.target[0].files[0]
   fileUpload(file,data)
  }



  return(
    <React.Fragment>
   <form className={classes['main-body']} onSubmit={submitHandler} >
      <Link to="/home">
      <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
      </Link>
      <label className={classes.label} >Choose a Group picture</label>
      <input className={classes.input} type="file" placeholder="Choose"/> <br/>
      <input className={classes.input} type="text" placeholder="Enter community name" value={enteredCommunity} /> <br/>
      <textarea className={`${classes.input} ${classes.area}`}  rows="10" cols="50" placeholder="Enter Group Name" ref={enteredgroup}/> <br/>
      <button className={classes.btn} type="submit">{loading?"Loading":"Add"}</button>
    </form>

    </React.Fragment>
  )
}
export default AddGroup