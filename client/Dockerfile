# Stage 1: Build
FROM node:20.10.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Environment
FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm ci --only=production

# Switch to non-root user for better security
USER node

EXPOSE 3000

# Run your app using a process manager like PM2
CMD ["npx", "pm2-runtime", "start", "npm", "--", "run", "start"]
