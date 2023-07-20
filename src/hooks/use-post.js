import { useState } from "react";
import { getDocs,query,where,collection, orderBy } from "firebase/firestore";
import {db} from "../components/firebase/index"
const usePost=(requestConfig,processData)=>{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (userData,findBy,condition) => {
    setIsLoading(true);
    setError(null);
    try {
      let q
      if(condition==="getAll"){
        q=query(collection(db,"posts"),orderBy("red","desc"))
      }else{
        q=query(collection(db,"posts"),where(findBy,"==",userData))
      }
      const data=await getDocs(q)
      processData(data)

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };
  return{
    isLoading,
    error,
    sendRequest
  }
}
export default usePost