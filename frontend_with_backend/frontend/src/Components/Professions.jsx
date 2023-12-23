import React, { useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import ProgressBar from '../ProgressBar';
import ProgressBar_vert from '../ProgressBar_vert';

function Professions() {
  const [progress, setProgress] = useState(0);
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
  const [pers_nums, setSum_pers_nums] = useState('')
  const [top5, setTop5] = useState(Array(10).fill(Array(10).fill([])));

  useEffect((prediction) => {
    const url = `https://ryazan.itatmisis.ru/get_prediction/${encodeURIComponent(token)}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          console.log('fetched data:', JSON.parse(data["data"]))
          setData(JSON.parse(data["data"]))
          setFirst_name(JSON.parse(data["data"])["profile_info"]["first_name"])
          setLast_name(JSON.parse(data["data"])["profile_info"]["last_name"])
          setUser_name(JSON.parse(data["data"])["profile_info"]["screen_name"])
          setAvatar(JSON.parse(data["data"])["profile_info"]["photo_200"])
          // setCharacter()
          setPred_prof(JSON.parse(data["data"])["sum_group"])

          // const sortedArray = Object.entries(data["preds"]).sort((a, b) => b[1] - a[1]);
          setTop5(Object.entries(JSON.parse(data["data"])["preds"]).sort((a, b) => b[1] - a[1]).slice(0, 5))
          // console.log('sort', data["data"]["preds"]).sort((a, b) => b[1] - a[1]).slice(0, 5))
          // console.log(character, character === null , character == null , character == "null" , character === "null" , character === undefined , character == undefined)
          if (JSON.parse(data["data"])["sum_pers"] === null) {
            setCharacter("Слишком мало информации о качествах личности пользователя, так как на его странице нет никаких постов")
          }
          else {setCharacter(JSON.parse(data["data"])["sum_pers"])
                setSum_pers_nums(JSON.parse(data["data"])["sum_pers_nums"]) }
          console.log(JSON.parse(data["data"]))
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    // Example to increment progress
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    console.log(pers_nums)
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 pt-10 items-center'>

        <div className='grid grid-cols-2 md:grid-cols-5 pt-4 items-baseline'>
              <div className='pr-5 items-center' >
                <div className='px-10'><ProgressBar_vert progress={pers_nums["Экстраверсия"]*100} color="blue" /></div>
                <p className='py-2'> Экстраверсия </p>
              </div>

              <div className='pr-5'>
                <div className='px-10'><ProgressBar_vert progress={pers_nums['Невротизм']*100} color="blue" /></div>
                <p className='py-2 px-3'> Невротизм </p>
              </div>

              <div className='pr-5'>
                <div className='px-10'><ProgressBar_vert progress={pers_nums['Эмоциональная стабильность']*100} color="blue" /></div>
                <p className='py-2'> Эмоциональная стабильность </p>
              </div>

              <div className='pr-5'>
                <div className='px-10'><ProgressBar_vert progress={pers_nums['Добросовестность']*100} color="blue" /></div>
                <p className='py-2'> Добросовестность </p>
              </div>

              <div className='pr-5'>
                <div className='px-10'><ProgressBar_vert progress={pers_nums['Открытость опыту']*100} color="blue" /></div>
                <p className='py-2'> Открытость опыту </p>
              </div>
        </div>

        
          <div className='py-4'>
                <p className='text-[22px] font-bold'>Анализ вашего типа личности:</p>
                <div> 
                    <p className='text-white text-[16px]'>{character}</p>
                </div>
          </div>

        

          <div className='py-4'>
                <p className='text-[22px] font-bold'>Анализ ваших хобби на основе социальных сетей:</p>
                <div> 
                    {pred_prof}
                </div>
          </div>


          <div className='py-4'>
                <p className='text-[22px] font-bold'>Топ-5 профессий, которые вам подойдут:</p>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-3 pt-10 items-center border-white'>
                        <p className='text-white text-[13px]'>{top5[0][0]}</p>
                        <div className='pr-5'>
                              <ProgressBar progress={top5[0][1]*100} color="blue" />
                      </div>
                        <p className='text-white text-[13px]'>{Math.round(top5[0][1]*100)}%</p>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-3 pt-10 items-center'>
                        <p className='text-white text-[13px]'>{top5[1][0]}</p>
                        <div className='pr-5'>
                              <ProgressBar progress={top5[1][1]*100} color="blue" />
                      </div>
                        <p className='text-white text-[13px]'>{Math.round(top5[1][1]*100)}%</p>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-3 pt-10 items-center'>
                        <p className='text-white text-[13px]'>{top5[2][0]}</p>
                        <div className='pr-5'>
                              <ProgressBar progress={top5[2][1]*100} color="blue" />
                      </div>
                        <p className='text-white text-[13px]'>{Math.round(top5[2][1]*100)}%</p>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-3 pt-10 items-center'>
                        <p className='text-white text-[13px]'>{top5[3][0]}</p>
                        <div className='pr-5'>
                              <ProgressBar progress={top5[3][1]*100} color="blue" />
                      </div>
                        <p className='text-white text-[13px]'>{Math.round(top5[3][1]*100)}%</p>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-3 pt-10 items-center'>
                        <p className='text-white text-[13px]'>{top5[4][0]}</p>
                        <div className='pr-5'>
                              <ProgressBar progress={top5[4][1]*100} color="blue" />
                      </div>
                        <p className='text-white text-[13px]'>{Math.round(top5[4][1]*100)}%</p>
                    </div>
              

                </div>
          </div>
    
    </div>

    

  )
}

export default Professions