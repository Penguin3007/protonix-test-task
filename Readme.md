# Test task for Protonix

## Steps to start server

1. Copy ``.env.example`` into `.env` file
2. Install dependencies with `npm install` command
3. Run server with `npm run start` command
4. I will provide my own database I used for developing

## Initial migration

Initial migration could be done via opening `/migrate` URL in browser. It will get all symbols from API and will create
user in DB

## Home page

Once you open home page you will see table with all symbols and prices

By clicking on table row you can add symbol to favorite or delete it from favorite if it is already in favorite

