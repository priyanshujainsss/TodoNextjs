'use client'
import { Context } from '@/components/Client'
import { redirect } from 'next/navigation';
import React, { useContext } from 'react'

const Profile = () => {
const {user}=useContext(Context);
if(!user?.id) return redirect("/login");

  return (
    <div><p>Profile</p>
    <h1>{user?.name}</h1>
    <p>{user?.email}</p></div>
  )
}

export default Profile