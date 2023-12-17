# Используйте официальный образ Python как родительский образ
FROM python:3.10

# Установите рабочую директорию в контейнере
WORKDIR /usr/src/app

# Скопируйте оба файла в контейнер
COPY requirements.txt ./
COPY main.py ./
COPY utils ./

# копирование сертификатов внутрь контейнера
COPY fullchain.pem ./

COPY privkey.pem ./

#VOLUME /etc/letsencrypt

# Установите зависимости из файла requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Укажите команду для запуска при старте контейнера
CMD ["python3", "./main.py"]
