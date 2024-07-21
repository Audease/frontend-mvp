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
