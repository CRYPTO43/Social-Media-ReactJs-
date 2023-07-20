import "./ForYou.css"
import { Grid } from "@mui/material"
import Suggestions from "./Suggestions"
import classes from "./ForYou.module.css"
const ForYou=(props)=>{
  let counter=0;
  let style=3;



  

const clickHandler=(id,bool)=>{
props.openPost(id,bool) 
}


  return(
    <div className={classes["for-you"]}>
     <Grid container className={classes["for-you-grid"]} columns={20} >
      {props.data.map((i)=>{
        if(counter%4==0){
          {counter++}
          return(
          <Grid className={classes["suggestions" ]} item md={13} >
          <Suggestions userId={i.userId} id={i.id} img={i.img} name={i.name} postHead={i.postHead} postDetails={i.postDetails} postOpen={clickHandler} />
        </Grid>
          )
        }
      else if(counter===style){
          {counter++}
          {style+=4}
          return(
         <Grid className={classes["suggestions"]} item md={13}>
          <Suggestions userId={i.userId} id={i.id} img={i.img} name={i.name} postHead={i.postHead} postDetails={i.postDetails} postOpen={clickHandler} /> 
         </Grid>
          )
       }
        else if(counter%4!==0){
          {counter++}
        return(
        <Grid className={classes["suggestions"]} item md={6} >
          <Suggestions userId={i.userId} id={i.id} img={i.img} name={i.name} postHead={i.postHead} postDetails={i.postDetails} postOpen={clickHandler} /> 
        </Grid>
        )}
      })}
     </Grid>
    </div>
  )
}
export default ForYou