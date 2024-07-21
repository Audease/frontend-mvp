# # Base image
# FROM node:20 AS build

# # Create app directory
# WORKDIR /usr/src/app

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Bundle app source
# COPY . .

# RUN npm run build

# FROM nginx:1.21.1-alpine
# COPY --from=build /usr/src/app/.next /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]
# # CMD ["next", "start"]

# Stage 1: Build the Next.js app
FROM node:20 AS build

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN npm run build
RUN npm run export

# Stage 2: Serve with Nginx
FROM nginx:1.21.1-alpine

# Copy the build output to Nginx HTML directory
COPY --from=build /usr/src/app/out /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
