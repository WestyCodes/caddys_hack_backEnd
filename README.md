# Caddy's Hack - A Golf Shot Tracker

A Full Stack Application, made with React and TailwindCSS. The Front-End can be found [here](https://github.com/WestyCodes/caddys_hack_frontEnd)

## Table of contents

-   [Caddy's Hack - A Golf Shot Tracker](#caddys-hack---a-golf-shot-tracker)
    -   [Table of contents](#table-of-contents)
    -   [General info](#general-info)
    -   [Technologies](#technologies)
    -   [Setup](#setup)

## General info

This is a solo project, with the MVP being created in just 8 days. The MVP consisted of a landing page, login and registration of new accounts, the golf shot tracker itself, and data visualisation. A fully functioning application to aid golfers with their future practise.

In order to do this, the back-end needed a scratch built Restful API, PostgreSQL Database, Json WebTokens, and password hashing.

## Technologies

Project is created with:

-   bCrypt version: 5.1.0
-   Prisma version: 4.13.0
-   cors version: 2.8.5
-   dotenv version: 16.0.3
-   express version: 4.18.2
-   jsonwebtoken version:9.0.0
-   morgan version: 1.10.0

## Setup

To run this project, install it locally using npm:

```
$ cd ../caddys_hack_backend
$ npm install
$ npm start
```

This is your `.env` file.

```
PORT=
DATABASE_URL="YOUR_DATABASE_URL"
SHADOW_DATABASE_URL="YOUR_SHADOW_DATABASE_URL"
JWT_SECRET=
JWT_EXPIRY=
```

1. Create a new database instance in ElephantSQL.
2. Create a `.env` with the above information.
3. Edit the `DATABASE_URL` variable in `.env`, swapping `YOUR_DATABASE_URL` for the URL of the database you just created. Leave `?schema=prisma` at the end.
4. Edit the `SHADOW_DATABASE_URL` variable in `.env`, swapping `YOUR_SHADOW_DATABASE_URL` for the URL of the shadow database you created in the earlier exercises. Leave `?schema=shadow` at the end.
5. Run `npm ci` to install the project dependencies.
6. Run `npx prisma migrate reset` to execute the existing migrations & data seed. Press `y` when it asks if you're sure.

You will also need to download and install the FrontEnd which can be found [here](https://github.com/WestyCodes/caddys_hack_frontEnd)
