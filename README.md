# Love Me Tender - Tender Management System

## Prerequisites

Ensure the following are installed on your system before proceeding:

- Docker Engine
- Docker Compose
- Node.js and npm (Node Package Manager)

## Deployed Website on render

This is our deployed website link https://love-me-tender-51qa.onrender.com

To upload the project latest version follow the steps below;

1. Go to render dashboard
2. Click on Manual Deploy button
3. Select deploy latest commit

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

4. To run the migrations, navigate to database folder and run

```sh
node ../node_modules/db-migrate/bin/db-migrate up

To modify the database, run the command below from the database folder, and add DB modifications in the generated ...-up.sql file

Then run above command again.

```sh
node ../node_modules/db-migrate/bin/db-migrate create name-for-the-migration --sql-file

5. Run the build command

```sh
npm run build
````

6. Run the code

```sh
npm start
```
