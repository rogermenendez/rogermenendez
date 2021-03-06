FROM ubuntu

# UPDATING UBUNTU
RUN apt-get update && apt-get install -y gnupg2
RUN apt-get upgrade -y

#INSTALLING NODEJS AND NPM
RUN apt-get install nodejs -y
RUN apt-get install npm -y

# INSTALLING GLOBAL LIBRARIES
RUN npm install -g typescript
RUN npm install -g ts-node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install
RUN npm run build

EXPOSE  3000

CMD [ "npm", "run", "prod" ]
