# Use Node.js official image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the backend package.json files
COPY ./backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY ./backend ./

# Expose the port for the backend server (default 5000)
EXPOSE 5000

# Start the server using npm (make sure `npm run dev` is set up in package.json with nodemon)
CMD ["npm", "run", "dev"]
