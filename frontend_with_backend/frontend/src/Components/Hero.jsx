import React, { useEffect, useState, useRef } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';


function Hero() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [data, setData] = useState({})
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [user_name, setUser_name] = useState('')
  const [avatar, setAvatar] = useState('')
  const [character, setCharacter] = useState('')
  const [pred_prof, setPred_prof] = useState('')

  const myRef = useRef(null);

  const goToComponent = () => {
    myRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const url = `https://ryazan.itatmisis.ru/get_prediction/${encodeURIComponent(token)}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          setData(JSON.parse(data["data"]))
          setFirst_name(JSON.parse(data["data"])["profile_info"]["first_name"])
          setLast_name(JSON.parse(data["data"])["profile_info"]["last_name"])
          setUser_name(JSON.parse(data["data"])["profile_info"]["screen_name"])
          setAvatar(JSON.parse(data["data"])["profile_info"]["photo_200"])
          setCharacter(JSON.parse(data["data"])["sum_pers"])
          setPred_prof(JSON.parse(data["data"])["sum_group"])
          console.log(JSON.parse(data["data"]))
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [])
  
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 pt-10 items-center'>
        <div className='mb-10'>
            <p className='text-white text-[13px]'>ДОБРО ПОЖАЛОВАТЬ НА ПРОФОРИЕНТАЦИОННЫЙ САЙТ</p>
            <p className='text-white text-[40px] font-bold'>{first_name} {last_name}</p>
            
            <p className='text-blue-500 text-[40px] font-bold'> @{user_name} </p>
            <div className='mt-4 flex gap-4'>
                <button className='text-white font-bold text-[18px] px-3 pb-2 py-2
             bg-blue-500 rounded-full border-[4px] hover:border-white'>АНАЛИЗ ПРОФЕССИИ ГОТОВ</button>
            </div>
        </div>
        <div className='flex justify-center'>
        <div className='h-[320px] w-[250px] p-2 rounded-[20px] bg-gradient-to-b from-[#7d4a10]  to-[#2A26B8]'>
            <img src={avatar}
            // <img src="полученный из запроса фото профиля вк">
            className='h-full w-[250px] object-cover rounded-[20px]'
            />
        </div>
        </div>
    </div>
  )
}

export default Hero