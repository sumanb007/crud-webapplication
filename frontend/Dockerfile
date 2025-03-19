# Stage 1: Build the React app
FROM node:16-alpine AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build  # Assumes "build" script exists in package.json

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=builder /frontend/build /usr/share/nginx/html
# Custom NGINX config for port 8080 and React routing
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf
# Explicitly expose port 8080 (optional but good practice)
EXPOSE 8080
