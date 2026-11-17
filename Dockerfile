# Filing engine image: API (src/index.ts) or worker (src/worker.ts), chosen by the command.
# The base image ships the browsers for this exact Playwright version (package.json pins 1.63.0).
# Check the tag exists before the first build: https://mcr.microsoft.com/en-us/product/playwright/tags
FROM mcr.microsoft.com/playwright:v1.63.0-noble
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
CMD ["npx", "tsx", "src/worker.ts"]
