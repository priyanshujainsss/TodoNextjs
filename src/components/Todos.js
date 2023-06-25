import React, { Suspense } from 'react'
import AddTodoForm from './AddTodoForm'
import { TodoItem } from './ServerComponent'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const fetchTodo=async(token)=>{
    const resp=await fetch(`${process.env.URL}/api/mytask`,{
      cache:"no-cache",
     headers:{
      cookie:`token=${token}`
     }
    })
    const todos=await resp.json()
    if(!todos.success){
  return [];
    }
    return todos.tasks;
    // console.log("todos",todos)
  }
export const Todos = async() => {
    const token=cookies().get("token")?.value;
    if(!token) redirect("/login")
  const todosList=await fetchTodo(token)

  return (
    <div> <AddTodoForm />
    <section className='todosContainer' >
            {
          todosList?.map(todo=>(
              
              <TodoItem title={todo.title} description={todo.description} date={todo.date} id={todo._id} completed={todo.isCompleted} key={todo._id} updateAt={todo.updatedAt} />
              ))
            }
        
    </section></div>
  )
}
