import React, { useState ,useEffect} from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';
import {produce} from "immer";
const Todos = ({ todolists, settodolists , currlid }) => {
  const [showcomplete, setshowcomplete] = useState(false)
  const [list, setlist] = useState(todolists[currlid.category].find(l => l.id === currlid.id))
  const [newtask, setnewtask] = useState("")
  const [percent, setpercent] = useState(0)
  function dailytitle(day) {
  const dailyNames = [
  "Sunday Reset 🧘",
  "Monday Motivation 💪",
  "Tuesday Grind ⚡",
  "Wednesday Flow 🌊",
  "Thursday Push 🚀",
  "Friday Focus 🎯",
  "Saturday Vibes 🎉"
];
  return dailyNames[day];
}
 useEffect(() => {
  setpercent(percentComplete())
   settodolists(produce(draft => {
     draft[currlid.category] = draft[currlid.category].map(l => {
       if (l.id === currlid.id) {
         return list
       }
       return l
     })
   }))
   return () => {
     console.log("Cleanup")
   }
 }, [list])
 useEffect(() => {
   setlist(todolists[currlid.category].find(l => l.id === currlid.id))
 }, [currlid])
 
function addTask() {
  if (newtask.trim() === "") {
    alert("Task cannot be empty")
    return
  }
  setlist(produce(list, draft => {
    draft.tasks.push({ id: uuidv4(), title: newtask, completed: false })
  }))
  setnewtask("")
}
function deltask(id) {
  setlist(produce(list, draft => {
    draft.tasks = draft.tasks.filter(task => task.id !== id)
  }))
}
function percentComplete() {
  const totalTasks = list.tasks.length
  const completedTasks = list.tasks.filter(task => task.completed).length
  return totalTasks === 0 ? 0 : Number(((completedTasks / totalTasks) * 100).toFixed(0))
}
function completetask(id,complete) {
  if(complete) return
  confirm("Are you sure you want to complete this task?") && setlist(produce(list, draft => {
    const task = draft.tasks.find(task => task.id === id)
    if (task) {
      task.completed = true
    }
  }))
}
const Task =({task})=>{
  const complete = task.completed
  const [edit, setedit] = useState(false)
  const [editvalue, seteditvalue] = useState("")
  function editask(id, title) {
    if(title.trim() === "") return 
  setlist(produce(list, draft => {
    const task = draft.tasks.find(task => task.id === id)
    if (task) {
      task.title = title
    }
  }))
}
  return (
     <div className={`todo border-b-3 border-light-primary dark:border-dark-primary pb-2 items-center justify-between ${complete && !showcomplete ? "hidden" : "flex"} `} key={task.id}>
            <div className="todo-left flex items-center gap-4  w-[80%] ">
              <div className={`checkbox rounded-full ${complete ?"" : "border"} size-5 cursor-pointer ${complete ? "bg-light-primary dark:bg-dark-primary" : ""}`} onClick={() => completetask(task.id,complete)}></div>
              {edit ? <input type="text" placeholder={`${task.title}`} value={editvalue} onChange={(e) => seteditvalue(e.target.value)} className='bb  p-1' /> : <p className={`text-md font-semibold md:max-w-[90%] max-w-[60%] sm:line-clamp-2 line-clamp-3 p-[6px] rounded-xl ${complete ? "line-through" : ""}`}>{task.title}</p>}
            </div>
           { !complete &&<><div className="todo-right flex items-center justify-center gap-3 flex-[20%]">
             {!edit?<><button onClick={() => deltask(task.id)} data-id={task.id} className="delete-btn controls group hover:bg-red-500  size-11 dark:hover:bg-red-700 cursor-pointer"><MdDelete className='text-red-500 size-7 dark:text-red-600 group-hover:text-white' /></button>
              <button data-id={task.id} onClick={() => setedit(!edit)} className="edit-btn controls group hover:bg-blue-500 size-11 dark:hover:bg-blue-700 cursor-pointer"><MdModeEdit className='text-blue-500 size-7 dark:text-blue-600 group-hover:text-white' /></button></>:  <> <button data-id={task.id} onClick={() => {setedit(!edit)
                 editask(task.id, editvalue)}} className="edit-btn controls group hover:bg-green-500 size-11 dark:hover:bg-green-700 cursor-pointer"><TiTick className='text-green-500 size-7 dark:text-green-600 group-hover:text-white' /></button></>}
            </div></>}
          </div>
  )
 }
  return (
    <div className='todocontainer mx-auto container h-[80vh] flex '>
      <div className="todos relative bg-light-bg dark:bg-dark-bg shadow-2xl  w-[90%] lg:w-[50%] md:w-[70%] sm:w-[90%] h-max-[90%]   rounded-4xl mt-10   mx-auto space-y-2">
        <div className="heading">
          <h2 className=' mt-4 text-center  font-semibold sm:text-3xl text-2xl'>{list.title==="Daily" ?`${dailytitle(list.day)}`:list.title}</h2>
          {list.title==="Daily" && <p className='text-center font-medium text-sm font-edu mt-1'>Auto Reset's Daily</p>}
        </div>
        <div className="p-b-container py-4 px-8">
          <h3 className='font-semibold text-xl sm:text-2xl '>You're {percent}% done!</h3>
          <div className="progressbar w-full h-4 bg-neutral-300 dark:bg-neutral-700 rounded-full mt-3">
            <div className={`progress h-full bg-light-primary dark:bg-dark-primary rounded-full`} style={{ width: `${percent}%` }}></div>
          </div>
        </div>
        <div className="newtask  w-full pt-4 px-8">
          <input type="text" value={newtask} onChange={(e) => setnewtask(e.target.value)} placeholder='Write a new task...' maxLength={100} className=' p-2 w-[100%] bb' />
        </div>
      { list.tasks.length > 0 && <><div className="toggle-complete  flex items-center justify-between px-8 pt-4">
        <h4>{showcomplete ? "Collapse Completed" : "Reveal Completed"}</h4>
          <button onClick={() => setshowcomplete(!showcomplete)} className='toggle-btn cursor-pointer '>{showcomplete ? <FaToggleOn className='text-light-primary dark:text-dark-primary size-7' /> : <FaToggleOff className='text-neutral-400 dark:text-neutral-600 size-7' />}</button>
        </div>
        <div className="todos-list pt-4 space-y-4 w-full max-h-[45%] px-8 overflow-auto   [&::-webkit-scrollbar-thumb]:bg-neutral-500/50  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 ">
          {list.tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div></>}
      {list.tasks.length === 0 &&  <div className="zero-task flex flex-col items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
          <RiTodoLine className='size-9 mt-10 text-light-primary dark:text-dark-primary' />
          <p className='text-lg'>No tasks available</p>
        </div>}
        <button onClick={addTask} className="add absolute bottom-5 right-5 bg-light-primary  size-12 dark:bg-dark-primary p-2 rounded-full items-center flex justify-center cursor-pointer group hover:bg-transparent hover:border hover:border-neutral-400 dark:hover:border-neutral-400">
          <IoMdAdd className=' text-white group-hover:text-light-primary dark:group-hover:text-dark-primary size-6' />
        </button>
      </div>
    </div>
  )
}

export default Todos
