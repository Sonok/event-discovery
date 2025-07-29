version: "3.9"

services:
  backend:
    build:
      context: .
      dockerfile: infra/Dockerfile.backend
    container_name: wtm-backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    env_file:
      - ./backend/.env
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    depends_on:
      - db

  frontend:
    build:
      context: .
      dockerfile: infra/Dockerfile.frontend
    container_name: wtm-frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    working_dir: /app
    command: npm run dev

  db:
    image: postgres:14
    container_name: wtm-db
    restart: always
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: wtm
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: wtm_db

volumes:
  pgdata:
