# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# Add these debug commands
RUN echo "Listing contents of /usr/src/app"
RUN ls -la /usr/src/app
RUN echo "Listing contents of /usr/src/app/dist (if exists)"
RUN ls -la /usr/src/app/dist || true
RUN echo "Listing contents of /usr/src/app/build (if exists)"
RUN ls -la /usr/src/app/build || true

# Production stage
FROM nginx:alpine

# Try both build and dist directories based on debug output
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]