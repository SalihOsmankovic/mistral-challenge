# Mistral Task

Mistral Task by Salih OsmankoviÄ‡

## Setup

### Backend

```bash
cd ./back
mkdir tmp
touch ./tmp/db.sqlite3
cp .env.example .env
npm i
node ace migration:run
```

### Frontend

```bash
cd ./front
npm i
```

## Running the application

### Backend

```bash
cd ./back
node ace serve --watch
```

### Frontend

```bash
cd ./front
npm run dev
```
