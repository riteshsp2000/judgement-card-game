# Use the official Node.js:lst runtime as a base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ["package*.json", "pnpm-lock*", "./"]

# Install pnpm
RUN npm install --global pnpm --force

# Install the dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the typescript application
RUN pnpm build

# Expose the port that the app will run on
EXPOSE 8080

# Tell docker what command will start the application
CMD [ "pnpm", "start" ]