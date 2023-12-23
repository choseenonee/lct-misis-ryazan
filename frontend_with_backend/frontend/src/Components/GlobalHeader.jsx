import React, { useState } from 'react'
import { HiBars3BottomRight, HiOutlineXMark } from "react-icons/hi2";
import MenuOverlay from './MenuOverlay';
function GlobalHeader() {

    const [toggle,setToggle]=useState(false)
    const menuList=[
    ]
  return (
    <div className='flex items-center justify-between'>
        <div>
        <h2 className='text-[24px] font-bold text-white'> <a href = "https://profilum.ru/" className='text-[24px] font-bold text-white hover:text-white '>Профилум</a>  
            <span className='text-blue-500'> VK</span></h2>
        </div>
        <div className='hidden md:flex gap-4'>
            {menuList.map((item)=>(
                <div>
                    <h2 className='text-white 
                    hover:border-[1px] border-blue-500 rounded-full
                    text-[15px] px-3 py-1 cursor-pointer'>{item.title}</h2>
                    </div>
            ))}
            <a href="https://ryazan.itatmisis.ru/login" className='text-white 
                    hover:border-[1px] border-blue-500 rounded-full 
                    text-[15px] px-3 py-1 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white '>ВОЙТИ</a>
        </div>
        <div className='md:hidden'>
           {!toggle? <HiBars3BottomRight onClick={()=>setToggle(!toggle)} className='text-white text-[22px] cursor-pointer'/>
           :<HiOutlineXMark onClick={()=>setToggle(!toggle)} className='text-white text-[22px] cursor-pointer'/>}
            {toggle?<MenuOverlay menuList={menuList} />:null}   
        </div>
    </div>
  )
}

export default GlobalHeader