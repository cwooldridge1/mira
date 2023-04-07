# syntax=docker/dockerfile:1

# Use a slim version of the Node base image.
FROM node:14-slim

EXPOSE 3000

WORKDIR /main

# Copy over just the list of node packages to install.
COPY ./client/ ./

# Install node packages.
RUN npm install --production

# Copy production .env file to the working directory.
COPY ./docker/client/.env.client.production .env.client.production

# Rename the .env file to overwrite existing .env file.
RUN mv .env.client.production .env

# Build the app to static js.
RUN npm run build

# Install a static host
RUN npm install -g serve

# Serve the built app
CMD ["serve", "-l", "3000", "-n", "-s", "build"]
