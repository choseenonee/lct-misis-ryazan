from transformers import BertTokenizer, BertForSequenceClassification
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import requests

modelBERT = SentenceTransformer('cointegrated/rubert-tiny2')
tokenizer_pers = BertTokenizer.from_pretrained("Minej/bert-base-personality")
model_pers = BertForSequenceClassification.from_pretrained("Minej/bert-base-personality")
df_pr = pd.read_csv("professions.csv", converters={'embs': lambda x: np.fromstring(x[1:-1], sep=' ')})


class ProfModel:
    def __init__(self, modelBERT, tokenizer_pers, model_pers, professionals):
        self.modelBERT = modelBERT
        self.tokenizer_pers = tokenizer_pers
        self.model_pers = model_pers
        self.professionals = dict(zip(professionals['profession'], professionals['embs']))

    def summarize_yagpt(self, promt):
        prompt4gpt = {
            "modelUri": "gpt://b1gkqihqgtg13vrsdj74/yandexgpt-lite",
            "completionOptions": {
                "stream": False,
                "temperature": 0,
                "maxTokens": "2000"
            },
            "messages": [
                {
                    "role": "system",
                    "text": "Ты - суммаризатор названий групп, на которые подсписан пользователь социальной сети." + \
                            "Тебе на вход попадутся через пробел названия групп. Тебе нужно вывести небольшой текст" + \
                            "о пользователе, о его хобби и интересах на осове названий групп, на которые он подписан." + \
                            "Я ожидаю текст на 15-20 предложений о человеке. "

                },
                {
                    "role": "user",
                    "text": promt
                }
            ]
        }

        url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Api-Key AQVN2YEVAwzQEVNkYFZ7PrgPkCFO0xHDoglUW9Rw"
        }

        response = requests.post(url, headers=headers, json=prompt4gpt)
        result = response.json().get("result").get('alternatives')[0].get("message").get("text")
        return result

    def personality_detection(self, text):
        inputs = self.tokenizer_pers(text, truncation=True, padding=True, return_tensors="pt")
        outputs = self.model_pers(**inputs)
        predictions = outputs.logits.squeeze().detach().numpy()

        label_names = ['Экстраверсия', 'Невротизм', 'Эмоциональная стабильность', 'Добросовестность',
                       'Открытость опыту']
        result = {label_names[i]: predictions[i] for i in range(len(label_names))}

        return result

    def personality_yagpt(self, promt):
        prompt4gpt = {
            "modelUri": "gpt://b1gkqihqgtg13vrsdj74/yandexgpt-lite",
            "completionOptions": {
                "stream": False,
                "temperature": 0,
                "maxTokens": "2000"
            },
            "messages": [
                {
                    "role": "system",
                    "text": "Привет! Ты — система анализа личности на основе модели Big Five. Ты должна составить текст-описание характера личности минимум 7 предложений.  Для этого ты используешь пять ключевых показателей ( числа от 0 до 1, где 0 - слабый показатель, а 1 - сильный показатель):" + \
                            "Экстраверсия: Высокий уровень экстраверсии характеризует людей, которые обычно находятся в центре внимания, легко устанавливают контакты и наслаждаются общением с другими." + \
                            "Доброжелательность: Люди с выраженной доброжелательностью обычно стремятся к сотрудничеству, поддерживают других и ориентированы на командную работу." + \
                            "Эмоциональная стабильность: Высокий уровень эмоциональной стабильности характеризует способность справляться со стрессом и изменениями без серьезных эмоциональных колебаний." + \
                            "Добросовестность: Люди с высоким уровнем добросовестности обычно организованны, целеустремленны и ответственны." + \
                            "Открытость опыту: Люди с выраженной открытостью опыту обычно интересуются новыми идеями, творчеством и разнообразием опыта." + \
                            "Я хочу получить от тебя текст о его характере личности с возможными предположениями, какие профессии ему могли бы подходить." +\
                            "ВАЖНО: Если ты считаешь, что информации недостаточно, ТО ЕСТЬ МАЛО ТЕКСТА ИЛИ ОНА НЕ УСМЫСЛЕНА выведи пустое сообщение."
                },
                {
                    "role": "user",
                    "text": promt
                }
            ]
        }

        url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Api-Key AQVN2YEVAwzQEVNkYFZ7PrgPkCFO0xHDoglUW9Rw"
        }

        response = requests.post(url, headers=headers, json=prompt4gpt)
        result = response.json().get("result").get('alternatives')[0].get("message").get("text")
        return result

    def return_pred(self, prompts):
        cos_sim = {}
        predicts = modelBERT.encode(prompts)
        for i in self.professionals.keys():
            cos_sim[i] = cosine_similarity(np.array(self.professionals[i]).reshape(1, -1), predicts.reshape(1, -1))[0][0]

        sorted_keys = sorted(cos_sim.keys(), key=lambda x: cos_sim[x], reverse=True)  # Сортируем ключи словаря
        sorted_dict = {key: cos_sim[key] for key in sorted_keys}  # Создаем новый словарь с отсортированными ключами
        return sorted_dict

    def translate(self, text):
        IAM_TOKEN = 't1.9euelZqNm8udiZeSjp7Oj8eXic_Mze3rnpWalZrHkMvJnJuakomTjM2UyIvl9Pd0AwNU-e86eVnP3fT3NDIAVPnvOnlZz83n9euelZqKjZ7Jkpeblo7Nks3Hmsqaz-_8xeuelZqKjZ7Jkpeblo7Nks3Hmsqazw.1p6oljZLtZLtISCNKAyBWU-vr4TLNV53cohl8UBlEFhaojgSzpmmrUccdPJCUtEzWKaBkNMJrzW9CMpuZBxFBg'
        folder_id = 'b1gkqihqgtg13vrsdj74'
        target_language = 'en'
        texts = [text]

        body = {
            "targetLanguageCode": target_language,
            "texts": texts,
            "folderId": folder_id,
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer {0}".format(IAM_TOKEN)
        }

        response = requests.post('https://translate.api.cloud.yandex.net/translate/v2/translate',
                                 json=body,
                                 headers=headers
                                 )
        try:
            ans = response.json().get("translations")[0].get("text")
        except:
            ans = text
        return ans

    def predict(self, groups_text, person_text):
        sum_group = self.summarize_yagpt(groups_text)
        if person_text is not None:
            person_text = self.translate(person_text)
            bigfive = self.personality_detection(person_text)
            sum_pers = self.personality_yagpt(str(bigfive))
        else:
            sum_pers = None
        sum_user = sum_group + (sum_pers if sum_pers is not None else "")
        preds = self.return_pred(sum_user)

        return preds, sum_group, sum_pers


