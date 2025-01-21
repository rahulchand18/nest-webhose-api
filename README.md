## Description

A webz api client implementation using [Nest](https://github.com/nestjs/nest) framework TypeScript and Prisma ORM.

## Project setup

```bash
$ npm install
```

## Configure Database

```bash
$ docker compose up --build -d
```

## Run the SQL migration

```bash
$ npx prisma migrate dev --name init
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

```
