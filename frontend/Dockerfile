# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /frontend/package.json
RUN npm install 
RUN npm install @babel/runtime@7.6.2 
RUN npm install bootstrap@4.3.1 
RUN npm install gitlab@11.1.2 
RUN npm install react@16.9.0 
RUN npm install react-bootstrap@1.0.0-beta.12 
RUN npm install react-dom@16.9.0 
RUN npm install react-router@5.1.0 
RUN npm install react-router-dom@5.1.0 
RUN npm install react-scripts@3.1.2 
RUN npm install react-table@6.10.3 

# start app
CMD ["npm", "start"]
