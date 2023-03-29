FROM node:18-alpine AS base
WORKDIR /home/node/app
COPY package.json package.json
COPY package-lock.json package-lock.json

# script for build application
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build
COPY . .

# script for start application
FROM build AS start
RUN npm prune --production
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]

# script for development environment
FROM base AS dev
RUN npm ci
COPY . .
CMD [ "npm", "run", "dev" ]

# script for test environment
FROM base AS test
RUN npm ci
COPY . .
CMD [ "npm", "run", "test" ]
