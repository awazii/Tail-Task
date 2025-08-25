// localStorage.removeItem("todolists")
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Todos from './Components/Todos'
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {produce} from "immer";
function App() {
  const [togglesidebar, settogglesidebar] = useState(false)
  const [todolists, settodolists] = useState(JSON.parse(localStorage.getItem('todolists')) || { daily: [{ id: uuidv4(), title: "Daily", date: dayjs().format('DD-MM-YYYY'), day: dayjs().format('d'), tasks: [] }], custom: [] })
  const [currlid, setcurrlid] = useState({ category: 'daily', id: todolists.daily[0].id })
  const showsidebar = () => {
    settogglesidebar(!togglesidebar);
  };
  useEffect(() => {
    localStorage.setItem('todolists', JSON.stringify(todolists));
    console.log(todolists)
  }, [todolists])
  useEffect(() => {
    const today = dayjs().format('DD-MM-YYYY')
    const prev= todolists.daily[0].date
     console.log(todolists)
    if (today !== prev) {
      settodolists(produce(todolists,drafts=>{
        drafts.daily[0].date = today
        drafts.daily[0].day = dayjs().format('d')
        drafts.daily[0].tasks = []
      }))
    }
  }, [])
  
  return (
    <>
      <Navbar showsidebar={showsidebar} />
      <Sidebar togglesidebar={togglesidebar} showsidebar={showsidebar} todolists={todolists} settodolists={settodolists} currlid={currlid} setcurrlid={setcurrlid}/> 
      <Todos todolists={todolists} settodolists={settodolists} currlid={currlid} />
    </>
  )
}

export default App
