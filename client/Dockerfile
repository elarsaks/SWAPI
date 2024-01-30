# Stage 1: Build
FROM node:20.10.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .

RUN npm run build

# Stage 2: Production Environment
FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000

# Run application
CMD ["npm", "run", "start"]
