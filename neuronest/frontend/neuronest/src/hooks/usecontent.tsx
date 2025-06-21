import axios from "axios";
import { useEffect, useState } from "react";

export default function usecontent(){
const [data,setdata]=useState([]);
const token = localStorage.getItem("token"); // This should be the plain token, no "Bearer" prefix

if (!token) {
  console.error("Token not found in localStorage");
}
function refresh(){
    axios.get('http://localhost:3000/content',{
        headers:{
            Authorization: `Bearer ${token}`,// This is the correct format
            "Content-Type": "application/json"
        }
     })
        .then((respose)=>{
            setdata(respose.data.content)
        })
}

    useEffect(()=>{
     refresh()
     const interval=setInterval(() => {
        refresh()
     }, 10*1000);
     return () =>clearInterval(interval);
    },[])
    return data;
}