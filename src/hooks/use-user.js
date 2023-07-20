import { useState } from "react";
import { getDocs } from "firebase/firestore";
const useUser=(requestConfig,processData)=>{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data=await getDocs(requestConfig.q)
      data.forEach((doc)=>{
        processData({...doc.data(),id:doc.id})
      })

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
export default useUser