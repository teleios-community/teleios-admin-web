FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install a specific version of npm globally
RUN npm install -g npm@8

# Install PM2 globally
RUN npm install -g pm2

# Install Yarn globally
#RUN npm install -g yarn

# Copy package.json to the container
COPY package*.json ./

# Install dependencies using Yarn
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV VITE_API_URL=
ENV VITE_SESSION_NAME=
ENV VITE_SESSION_KEY=
ENV VITE_TOKEN_NAME=
ENV VITE_TOKEN_KEY=

# Build the React app
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the React app with PM2
CMD ["npm", "start"]
