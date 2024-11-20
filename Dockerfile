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
ENV VITE_API_URL="https://dev.jointeleios.com/api/admin"
ENV VITE_SESSION_NAME="TELE_SESSION"
ENV VITE_SESSION_KEY="TELE_IOS_SESS_ION_KEY"
ENV VITE_TOKEN_NAME="TELE_TOKEN"
ENV VITE_TOKEN_KEY="TELE_IOS_TOK_EN_KEY"

# Build the React app
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the React app with PM2
CMD ["npm", "start"]
