# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /frontend

ADD . /frontend
RUN apk add --no-cache bash
RUN npm install


# start app
EXPOSE 3000

CMD bash
