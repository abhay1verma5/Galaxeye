# Use Node.js official image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the frontend package.json files
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY ./frontend ./

# Expose the port for the frontend server (default 3000)
EXPOSE 3000

# Start the frontend server (make sure `npm start` is set up in package.json)
CMD ["npm", "start"]
