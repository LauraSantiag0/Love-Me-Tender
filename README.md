# Love Me Tender - Tender Management System

## Prerequisites

Ensure the following are installed on your system before proceeding:

- Docker Engine
- Docker Compose
- Node.js and npm (Node Package Manager)

## Deployed Website on render

This is our deployed website link https://love-me-tender-51qa.onrender.com

The render is on auto-deploy so it should render new changes to the website.

## ⏬ Installation and setup

To run this website locally, follow the following instructions:

1. Clone the repo

```sh
git clone https://github.com/LauraSantiag0/Love-Me-Tender
```

2. Run this command to start the database

```sh
docker compose up -d
```

3. Install NPM packages

```sh
npm install
```

4. Run the build command

```sh
npm run build
```

5. Run the code

```sh
npm start
```

## Database Migrations

To modify the database, run the command below from the database folder, and add DB modifications in the generated ...-up.sql file

Then run above command again.

```sh
node ../node_modules/db-migrate/bin/db-migrate create name-for-the-migration --sql-file
```
