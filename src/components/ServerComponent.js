import React from 'react'
import { TodoBtn } from './Client'

export const TodoItem = ({title,description,id, completed}) => {
  return (
    <div className='todo' >
        <div>
            <h4>{title}</h4>
            <h4>{description}</h4>
        </div>
        <TodoBtn id={id} completed={completed} />
    </div>
  )
}

