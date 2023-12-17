import json
import time
from datetime import datetime, timedelta
import requests

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import urlencode
import uvicorn
import httpx
import jwt

from utils import apicommands

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешает все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает все методы
    allow_headers=["*"],  # Разрешает все заголовки
)

CLIENT_ID = 51815611
CLIENT_SECRET = 'VMolJrZUbAxAu7BDkTe0'
REDIRECT_URI = 'https://ryazan.itatmisis.ru/callback'  # URL для перенаправления после авторизации
SECRET_KEY = "8f0d2aefd6bb67d839fba386a30b0bc360a529aa12d04474ea6c176731d09b1f"
FRONTEND_URL = "http://ryazan.itatmisis.ru:8000"
ML_URL = "http://158.160.28.36:8000/get_predict"


@app.get("/login")
def login():
    params = {
        'client_id': CLIENT_ID,
        'redirect_uri': REDIRECT_URI,
        'response_type': 'code',
        'scope': 'friends,groups',
    }
    url = f'https://oauth.vk.com/authorize?{urlencode(params)}'
    return RedirectResponse(url)


@app.get("/callback")
async def callback(code: str):
    token_url = 'https://oauth.vk.com/access_token'
    token_params = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'code': code,
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(token_url, params=token_params)
    if response.status_code != 200:
        print(response, response.text)

    access_token = response.json().get('access_token')
    user_id = response.json().get('user_id')

    agent = apicommands.ApiAgent(access_token, user_id)

    groups_prompt = ""
    groups = await agent.get_groups()
    try:
        for i in range(len(groups)):
            groups_prompt += f"{groups[i].get('name')}" + " "
    except Exception as e:
        groups_prompt = None
        print(e)

    wall = await agent.get_wall(user_id)
    try:
        wall = [wall[i].get("text") for i in range(len(wall))]
        wall = str(wall)
    except Exception as e:
        wall = None
        print(e)

    if groups_prompt is not None:
        data = {'groups_text': groups_prompt, 'person_text': wall}
        response = requests.put(ML_URL, json=data)
        if response.status_code != 200:
            print(response.text, data)
            result_dict = {"data": "ошибка"}
        else:
            result_dict = response.json()
    else:
        result_dict = {"data": "у пользователя нет ни одной группы"}

    result_dict["profile_info"] = await agent.get_profile_info()

    data_json = json.dumps(result_dict, ensure_ascii=False)
    token = jwt.encode({'data': data_json, 'exp': datetime.utcnow() + timedelta(minutes=10)}, SECRET_KEY,
                       algorithm="HS256")
    return RedirectResponse(url=f"{FRONTEND_URL}/decode-jwt/?token={token}")


if __name__ == "__main__":
    try:
        uvicorn.run("main:app", host="0.0.0.0", port=443,
                    ssl_keyfile="privkey.pem",
                    ssl_certfile="fullchain.pem")
    except Exception as e:
        print(e)
        time.sleep(15)
        uvicorn.run("main:app", host="0.0.0.0", port=443,
                    ssl_keyfile="/etc/letsencrypt/privkey.pem",
                    ssl_certfile="/etc/letsencrypt/fullchain.pem")
