# Use Node.js 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all code
COPY . .

# Expose a dummy web port for Back4app (so the container is alive)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]
