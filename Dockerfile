FROM node:18

# Create app directory
WORKDIR /app
ARG NPM_TOKEN

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install

EXPOSE 3000

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]