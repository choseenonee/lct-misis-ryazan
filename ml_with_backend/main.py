import time
from typing import Dict, Union

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import urlencode
import uvicorn
import httpx
from pydantic import BaseModel

from utils import apicommands, ml

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешает все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает все методы
    allow_headers=["*"],  # Разрешает все заголовки
)


class InputModel(BaseModel):
    groups_text: str
    person_text: Union[str, None] = None


class OutputModel(BaseModel):
    preds: Dict
    sum_group: str
    sum_pers: Union[str, None] = None
    sum_pers_nums: Union[Dict, None] = None


model = ml.ProfModel(modelBERT=ml.modelBERT, tokenizer_pers=ml.tokenizer_pers, model_pers=ml.model_pers,
                     professionals=ml.df_pr)


@app.put("/get_predict", response_model=OutputModel)
def get_predict(raw_data: InputModel):
    print(raw_data.model_dump())
    data = model.predict(raw_data.groups_text, raw_data.person_text)
    if raw_data.person_text is not None:
        sum_pers_nums = model.personality_detection(raw_data.person_text)
    else:
        sum_pers_nums = None
    response_data = {"preds": data[0], "sum_group": data[1], "sum_pers": data[2], "sum_pers_nums": sum_pers_nums}
    return response_data


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
