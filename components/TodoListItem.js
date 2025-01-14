import axios from "axios"
import React from "react"
import { useRef } from "react"
import { useState } from "react"
import { useAuth } from "../context/auth"
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";
/* eslint-disable @next/next/no-img-element */

export default function TodoListItem({title,id}) {
  const [edit, setEdit] = useState(false)
  const updateRef = useRef()
  const {token1,flag,setFlag} = useAuth()
  const editTask = (id) => {
    setEdit(!edit)
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
  }

  const deleteTask = (id) => {
    console.log(id);
    axios.delete(`https://todo-app-csoc.herokuapp.com/todo/${id}/`,
    {
      headers:{
        Authorization:"Token " + token1
      }
    },
    )
    .then((e)=>{
      console.log(e);
      setFlag(!flag)
    })
    .catch((err)=>{
      console.log(err);
    })
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
  }

  const updateTask = (id) => {

    
    axios.patch(`https://todo-app-csoc.herokuapp.com/todo/${id}/`,
    {
      title:updateRef.current.value
    },
    {
      headers:{
        Authorization:"Token " + token1
      }
    },
    )
    .then((e)=>{
      console.log(e);
      setEdit(!edit)
      setFlag(!flag)
    })
    .catch((err)=>{
      console.log(err);
    })
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  }
  return (
    <>
      <li className='todo-row border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${id}`}
          type='text'
          className={`${!edit?'hideme' :""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none todo-edit-task-input`}
          placeholder='Edit The Task'
          ref={updateRef}
        />
        <div id={'done-button-'+id} className={`${!edit?'hideme' :""}`}>
          <button
            className='text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded ml-2 todo-update-task'
            type='button'
            onClick={()=>updateTask(id)}
          >
            Done
          </button>
        </div>
        <div id={'task-'+ id} className={`todo-task px-5 ${edit?'hideme':""}`}>
          {title} 
        </div>
        <span id={'task-actions-'+id} className={`${edit?'hideme':""}`}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(id)}
            className='bg-transparent hover:bg-custom2 hover:text-white border border-custom2 hover:border-transparent rounded px-2 py-2'
          >
            <RiEditBoxLine/>
          </button>
     <button className="bg-transparent hover:bg-custom1 hover:text-white border border-custom1 hover:border-transparent rounded px-2 py-2"
     onClick={()=>{deleteTask(id)}}
     >
      <RiDeleteBin6Line/>
     </button>
            
          
        </span>
      </li>
    </>
  )
}
