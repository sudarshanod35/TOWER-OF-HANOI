FROM node:20-bookworm-slim

RUN apt-get update \
    && apt-get install -y swi-prolog \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

COPY frontend ./frontend
RUN cd frontend && npm run build

COPY backend ./backend

EXPOSE 10000

CMD ["node", "backend/server.js"]