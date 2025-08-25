import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { TbBrandDaysCounter } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiTodoLine } from "react-icons/ri";
import { produce } from "immer";
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';
const Sidebar = ({ togglesidebar, showsidebar, todolists, settodolists, currlid, setcurrlid }) => {
    const [newlist, setnewlist] = useState("")
    const Renderlist = ({ list, custom }) => {
        const count = list.tasks.length;
        return (
            <>
                <div className="task-name flex items-center gap-2 ">
                    {custom ? <MdDashboardCustomize className='size-6  text-light-primary dark:text-dark-primary' /> : <TbBrandDaysCounter className='size-6 text-light-primary dark:text-dark-primary' />}
                    <span className='text-light-text dark:text-dark-text text-lg lg:max-w-[90%] max-w-[70%] line-clamp-1'>{list.title}</span>
                </div>
                <span className='counts'>{count}</span>
            </>
        )
    }
    function addlist() {
        if (newlist.trim() === '') return
        settodolists(produce(draft => {
            if (newlist.trim() === '') return
            draft.custom.push({ id: uuidv4(), title: newlist, tasks: [] })
        }))
        setnewlist("")
    }
    return (
        <div className={`Sidebar lg:w-[22vw] md:w-[30vw] sm:w-[40vw] w-[250px] z-10 h-full bg-light-side dark:bg-dark-side p-4   fixed top-0 transition-[left] duration-300 ease-in-out ${togglesidebar ? 'left-0' : 'left-[-100vw]'} flex flex-col items-center justify-between gap-4`}>
            <div onClick={showsidebar} className="hamburgercontainer w-12 h-12 mx-auto flex items-center  justify-center mt-5 group flex-[5%]" >
                <RxCross2 className='size-7  cursor-pointer  hamburgerbtn group-hover:text-light-primary group-hover:dark:text-dark-primary' />
            </div>
            <div className="lists-container flex-[95%]   w-full ">
                <div onClick={() => setcurrlid({ category: 'daily', id: todolists.daily[0].id })} className={`daily list h-max ${todolists.daily[0].id === currlid.id ? 'activated' : ''}  p-2`}>
                    <Renderlist list={todolists.daily[0]} />
                </div>
                <div className="divider my-2 w-full border border-neutral-300 dark:border-neutral-600"></div>
                {todolists.custom.length === 0 ? <div className="zero-list flex flex-col items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <RiTodoLine className='size-6 text-light-primary dark:text-dark-primary' />
                    <p>No lists available</p>
                </div> : ''}

                <div className="custom-lists max-h-[65%]  overflow-auto  [&::-webkit-scrollbar-thumb]:bg-neutral-500/50  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
                    {todolists.custom.map((list, index) => (
                        <div onClick={() => setcurrlid({ category: 'custom', id: list.id })} className={`c-list list ${list.id === currlid.id ? "activated" : ''}`} key={index}>
                            <Renderlist list={list} custom={true} />
                        </div>
                    ))}
                </div>
                <div className="add-list flex items-center justify-between gap-2 mt-4 w-full">
                    <input type="text" maxLength={50} value={newlist} onChange={(e) => { setnewlist(e.target.value) }} placeholder="Add a new list" className="border border-neutral-400 dark:border-neutral-600 rounded-lg p-2 w-[85%]" />
                    <button onClick={addlist} className="add-button border border-neutral-400 dark:border-neutral-600 rounded-lg p-2 cursor-pointer group hover:bg-light-primary dark:hover:bg-dark-primary hover:border-transparent">
                        <IoMdAdd className='size-6 text-light-primary dark:text-dark-primary group-hover:text-white' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

