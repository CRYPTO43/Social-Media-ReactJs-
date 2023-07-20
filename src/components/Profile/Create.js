import classes from "./Create.module.css"
import { useRef, useState } from "react"
import { Link,useHistory } from "react-router-dom"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import { addDoc,collection } from "firebase/firestore";
const Create=()=>{
  const [progress,setProgress]=useState(0)
  const history=useHistory()
  let enteredEmail=useRef()
  let enteredName=useRef()
  let enteredPassword=useRef()

const sendData=async(data)=>{
await addDoc(collection(db,'users'),data)
await addDoc(collection(db,"chats"),{userId:data.userId})

}


  const fileUpload=(file,data)=>{
    const sotrageRef = ref(storage, `files/users/${file.name}`);
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
            link:downloadURL
          }
          sendData(toSendData)
        });
      }
    );
  }

const submitHandler=(event)=>{
  event.preventDefault()
  let data={
    email:enteredEmail.current.value,
    password:enteredPassword.current.value,
    name:enteredName.current.value,
    userId:(Math.floor(Math.random()*1000000)).toString()
  }
  enteredEmail.current.value=""
  enteredPassword.current.value=""
  enteredName.current.value=""
  const file=event.target[0].files[0]
  fileUpload(file,data)
  history.push('/profile')
}
  return(
    <form className={classes['main-body']} onSubmit={submitHandler} >
    <Link to="/home">
    <img className={classes.back}  src="./images/for-you/back-arrow.png" height={30} width={25}/>
    </Link>
    <label className={classes.label} >Choose a Profile picture</label>
    <input className={classes.input} type="file" placeholder="Choose"/> <br/>
    <input className={classes.input} type="text" placeholder="Enter your name" ref={enteredName}/> <br/>
    <input className={classes.input} type="email" placeholder="Enter your email" ref={enteredEmail}/> <br/>
    <input className={classes.input} type="password" placeholder="Enter your password" ref={enteredPassword} /><br/>
    <Link to="/profile" className={classes.redirect}>
      Have account?Login
     </Link>
    <button className={classes.btn} type="submit">Create</button>
  </form>
  )
}
export default Create