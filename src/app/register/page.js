'use client'

import { Context } from '@/components/Client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import {redirect} from 'next/navigation'
import { toast } from 'react-hot-toast'
const Register = () => {
const {user,setUser}=useContext(Context)

  const [email,setEmail]=useState("")
  const [name,setName]=useState("")
const [password,setPassword]=useState("")

const registerHandler=async(e)=>{
  e.preventDefault()
const resp=await fetch("/api/auth/register",{
  method:"POST",
  body:JSON.stringify({name,email,password}),
  headers:{
    "Content-Type":"application/json"
  }
})
console.log("response",resp)
const data=await resp.json()
console.log(data)
if(!data.status){
  return toast.error(data.message)
}

setUser(data.user)
toast.success(data.message)
}
if(user._id){
  return redirect("/")
}

  return (
    <div className='login' >
        <section>
            <form onSubmit={registerHandler} >
            <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Password'  value={password} onChange={e=>setPassword(e.target.value)} />
               
                <button type='submit' >Sign up</button>
                <p>OR</p>
                <Link href={"/login"} >Login </Link>
            </form>
        </section>
    </div>
  )
}

export default Register