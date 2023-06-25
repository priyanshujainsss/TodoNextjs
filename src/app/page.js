
import { Todos } from '@/components/Todos'
import { Suspense } from 'react'


const page = async() => {

  return (
    <div className='container' >
        <Suspense  fallback={<div>loading...</div>}>

     <Todos />
        </Suspense>
    </div>
  )
}

export default page