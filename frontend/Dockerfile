# Use the official Node.js image as the base image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG NEXT_PUBLIC_BASE_API

ENV NEXT_PUBLIC_BASE_API=$NEXT_PUBLIC_BASE_API


# Build the application
RUN npm run build

# Expose the necessary port
EXPOSE 3000

# Use the production command to start the app
CMD ["npm", "run", "start"]
