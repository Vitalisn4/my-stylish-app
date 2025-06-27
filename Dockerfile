# Use a lightweight Node.js image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies first to leverage caching
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Document the port the app listens on
EXPOSE 8080

# The command to run when the container starts
CMD [ "node", "server.js" ]