import React from 'react'
import { TodoBtn } from './Client'

export const TodoItem = ({title,description,id, completed,date,updateAt}) => {
  return (
    <div className='todo' >
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
            <p>Created At:  {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</p>
            <p>Updated At: {new Date(updateAt).toLocaleString()} </p>
        </div>
        <TodoBtn id={id} completed={completed} />
    </div>
  )
}

