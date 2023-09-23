###########
# BUILDER #
###########

# pull official base image
FROM --platform=linux/amd64 node:16.5.0-alpine as builder

# set working directory
WORKDIR /usr/src/app

# add `usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# create build
COPY . .
RUN npm run build

#########
# FINAL #
#########