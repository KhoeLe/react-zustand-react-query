
FROM node:21

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the application and 8000 for the json-server
EXPOSE 3000 8000

# Install pm2 to manage multiple processes
RUN npm install -g pm2

# Define the command to run the application and the json-server
CMD ["pm2-runtime", "start", "npm", "--", "run", "dev", "server"]