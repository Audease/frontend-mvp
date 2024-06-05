# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

<<<<<<< HEAD
EXPOSE 3000# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["next", "start"]
=======
EXPOSE 3000
>>>>>>> 6abe268a242e701341a6e5b4dedeeff69636f1e7
