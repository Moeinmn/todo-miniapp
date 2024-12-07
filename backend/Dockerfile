# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app will run on
EXPOSE 9000

# Set the command to run the application
CMD ["npm", "run", "start:dev"]
