'use client'

import { Context } from '@/components/Client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

const Login = () => {
  const {user,setUser}=useContext(Context)
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const loginHandler=async(e)=>{
  e.preventDefault()
const resp=await fetch("/api/auth/login",{
  method:"POST",
  body:JSON.stringify({email,password}),
  headers:{
    "Content-Type":"application/json"
  }
})
console.log("response",resp)
const data=await resp.json()
console.log(data)
if(!data.success){
  return toast.error(data.message)
}
setUser(data.user)
toast.success(data.message)
}
if(user?._id){
  return redirect("/")
}

  return (
    <div className='login' >
        <section>
            <form onSubmit={loginHandler} >
                <input type="email" placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Password'  value={password} onChange={e=>setPassword(e.target.value)} />
                <button type='submit' >Login</button>
                <p>OR</p>
                <Link href={"/register"} >New User</Link>
            </form>
        </section>
    </div>
  )
}

export default Login