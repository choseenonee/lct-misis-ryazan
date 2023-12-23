import React from 'react'
import MyIcon from '../assets/vk-v2-svgrepo-com.svg';


function GlobalHero() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 pt-10 items-center'>
        <div className='mb-10'>
            <p className='text-white text-[13px]'>СЕРВИС ПРОФОРИЕНТАЦИИ НА ОСНОВЕ СОЦИАЛЬНОЙ СЕТИ VK</p>
            <p className='text-white text-[40px] font-bold'>ПРОЙДИТЕ АВТОРИЗАЦИЮ</p>
            <p className='text-blue-500 text-[40px] font-bold'> И УЗНАЙТЕ, КАКАЯ ПРОФЕССИЯ </p>
            <p className='text-white text-[40px] font-bold'>подходит вам больше всего</p>
            <div className='mt-4 flex gap-4'>
                <button className='text-white font-bold text-[18px] px-3 pb-2 py-2
             bg-white rounded-full border-[4px] hover:border-blue-500 items-center'> <a className='text-blue-500 font-bold text-[18px] px-4 pb-2 py-2 pr-5
             bg-white rounded-full hover:text-blue-500' href='https://ryazan.itatmisis.ru/login'>   АВТОРИЗИРОВАТЬСЯ ЧЕРЕЗ VK <img src={MyIcon} className='h-[21px] inline-block pb-0.5' />  </a> </button>
            </div>
            
        </div>
        
    </div>
    
  )
}

export default GlobalHero