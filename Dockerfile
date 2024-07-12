# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Set environment variable
ENV NODE_ENV=production

# Expose the port on which the React app runs (usually 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
