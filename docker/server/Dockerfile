# syntax=docker/dockerfile:1

# Base image
FROM python:3.10-slim

# Set directory so that all docker commands run in this folder
WORKDIR /main

#Copies the entire backend
COPY ./server/src .

#Install dependencies
RUN pip3 install -r requirements.txt

# Overwrite env file with production
COPY ./docker/server/.env.server.production .env.server.production
RUN mv .env.server.production .env

CMD ["python", "main.py"]