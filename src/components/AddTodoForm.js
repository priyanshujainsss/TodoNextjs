'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import { Context } from './Client'
const AddTodoForm = () => {
  const {user}=useContext(Context)
  const router=useRouter()
  const [title,setTitle]=useState("")
const [description,setDescription]=useState("")
const [date,setDate]=useState("")

const handleAddTodo=async(e)=>{
  e.preventDefault()
  const resp=await fetch("/api/newTask", {
    method:"POST",
    body:JSON.stringify({title,description,date}),
    headers:{
      "Content-Type":"application/json"
    }
  })
  const res=await resp.json();
  if(res.status){

    toast.success(res.message)
    router.refresh()
    setTitle("")
    setDescription("")
    setDate("")
  }
  else{
    toast.error(res.message)

  }

}

if(!user?._id) return redirect("/login")
  return (
    <div className='login' >
        <section>
            <form onSubmit={handleAddTodo}>
                <input type="text" placeholder='Task Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input type="text" placeholder='Task Description' value={description} onChange={(e)=>setDescription(e.target.value)}  />
                <input type="datetime-local" placeholder='Choose date' value={date} onChange={(e)=>setDate(e.target.value)}  />

                <button type='submit' >Add Task</button>
              
            </form>
        </section>
    </div>
  )
}
export const metadata = {
    title: 'Todo App',
    description: 'Generated by create next app',
  }
export default AddTodoForm