#Base image
FROM node:20-alpine

#Set working directory
WORKDIR /app

#Copy package.json and package-lock.json to install dependencies
COPY package*.json package-lock.json ./

#Install root-level dependencies (for next.js)
RUN npm install

# Copy all files to the container
COPY . .

# Install backend (Express) dependencies
RUN cd server && npm install

# Expose necessary ports for both Next.js and Express
EXPOSE 3000 5000

# Install a process manager (optional, for development convenience)
RUN npm install -g concurrently

# Default command to run Next.js and Express together
CMD ["npm", "run", "dev:all"]