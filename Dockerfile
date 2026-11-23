# Filing engine image: API (src/index.ts) or worker (src/worker.ts), chosen by the command.
#
# Two targets:
#   steel  docker build --target steel .   No browser bundled. For a worker whose browsers all
#          run on Steel (BROWSER_PROXY=steel); it refuses to start if any site would need a
#          local browser. Small, and runs anywhere Node runs. Also fine for the API tier.
#   full   docker build .   (the default) Ships Chromium for this exact Playwright version
#          (package.json pins 1.63.0), for sites that go direct or through a proxy. Check the
#          tag exists before the first build: https://mcr.microsoft.com/en-us/product/playwright/tags

FROM node:24-bookworm-slim AS steel
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production BROWSERS=steel-only
CMD ["npx", "tsx", "src/worker.ts"]

FROM mcr.microsoft.com/playwright:v1.63.0-noble AS full
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
CMD ["npx", "tsx", "src/worker.ts"]
