"use client";

import Link from "next/link";
import { redirect,useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(()=>{
   fetch("api/auth/profile").then(res=>res.json()).then(data=>setUser(data.user))
  },[])
  return (
    <Context.Provider value={{ user, setUser }}>{children} <Toaster /></Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user,setUser } = useContext(Context);
  const handleLogout = async() => {

    const res=await fetch("/api/auth/logout")
    const resp=await res.json()
   
    if(resp.success)
    {
      
      toast.success(resp.message)
      setUser({})
      return redirect("/login")
    }
    


  };

  return user?._id ? (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export const TodoBtn=({id,completed})=>{
  console.log("sskjsds",id,completed)
const router=useRouter()
  const deleteHandler=async(id)=>{
    const resp=await fetch(`/api/task/${id}`,{
      method:"DELETE"
    })
    const response=await resp.json();
    console.log("response",response)
    toast.success(response.success)
    router.refresh()
  }
  const handleChange=async(id)=>{

    const resp=await fetch(`/api/task/${id}`,{
      method:"PUT"
    })
    const response=await resp.json();
    console.log("response",response)
    toast.success(response.success)
    router.refresh()
  }
  return(
    <div>
      <input type="checkbox"  checked={completed} value={completed}  onChange={()=>handleChange(id)}  />
      <button onClick={()=>deleteHandler(id)} className="btn" >Delete</button>
    </div>
  )
}