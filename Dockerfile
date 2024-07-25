# Stage 1: Build the Next.js application
FROM node:20 as builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Install pm2
RUN apk add --no-cache nodejs npm
RUN npm install pm2 -g

# Copy the built files from the previous stage
COPY --from=builder /usr/src/app /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start pm2 and Nginx server
CMD ["pm2-runtime", "npm", "--", "start"]
