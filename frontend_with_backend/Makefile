BACKEND_IMAGE_NAME=vkapi
FRONTEND_IMAGE_NAME=lct-frontend

FRONTEND_DIR=./frontend

COMPOSE_FILE=docker-compose.yaml


all: build up


start: build up
clean: down clean-images


build:
	docker build -t $(BACKEND_IMAGE_NAME) .
	docker build -t $(FRONTEND_IMAGE_NAME) $(FRONTEND_DIR)


up:
	docker-compose up


down:
	docker-compose down


clean-images:
	docker rmi $(BACKEND_IMAGE_NAME) $(FRONTEND_IMAGE_NAME)

# Специальное правило, указывающее, что эти правила не связаны с файлами
.PHONY: all build up down clean-images clean