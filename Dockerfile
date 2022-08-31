FROM node:16-alpine

WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
RUN npm ci
COPY . .

RUN npx prisma generate

# Build the application
RUN npm run clean
RUN npm run build

# Run the application
EXPOSE $SERVER_PORT
CMD [ "npm", "start"]