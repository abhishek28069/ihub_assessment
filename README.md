# IHUB Data Assessment - Task 1: NodeJs Service For Ghost Blog Engine

---

## Requirements

- node.js version 18.12.1

## Installation/Setup

- go to folder `/ghost_server` and run:
  ```
  npm install ghost-cli@latest -g
  ghost install local //only for a fresh installation
  ghost start
  ```
  - This installs the `ghost-cli` and starts the already existing ghost local server.
  - The ghost blog engine will be up and running at port `2368`.
  - Admin panel is at `http.//localhost:2369/ghost/admin`.
    - Credentials for logging in are `email:` abhishek.gaddam@students.iiit.ac.in and `password:` nd.2PSyyUH5dJLf   
  - NOTE: If you want to start with fresh installation of ghost, run `ghost install local` before `ghost start`.
    - Then go through the setup and populate it manually with some blog posts.
    - Go to `settings/integrations` and add a custom integration, copy the content_api key and update it in `/.env` file in the root folder.
    - Go through [https://ghost.org/docs/install/local/](https://ghost.org/docs/install/local/) for any help.
  - To stop the ghost server, run `ghost stop`.
- go to the folder `/` and run:

  ```
  npm install
  npm run start
  ```

  - This will start the node service on port `3000`, connected to the ghost blog engine.
  - The `.env` file has information about the ghost server.

- go to the folder `/client_app` and run:
  ```
  npm install
  npm run dev
  ```
  - This will start the react.js client app on port `5173` which will demonstrate the usage of our newly created service.
  - The `.env` file has information about the node.js server.

## Node service
- Service is clearly documented using Postman and available at [https://documenter.getpostman.com/view/8017219/2sA2xh2CXM](https://documenter.getpostman.com/view/8017219/2sA2xh2CXM), has example responses too.
- Implemented three routes
  ```
  /published-blogs
  /published-blogs-last-week
  /blog/:idOrTitle
  ```
- Used the [content api](https://ghost.org/docs/content-api/) provided by ghost to fetch the blog posts.



- Also used the advanced [filtering service](https://ghost.org/docs/content-api/#filtering) provided by ghost which involves NQL.

## React Client

- Implemented a sample client app which fully utilizes the above created node service.



- Styled with `tailwindcss` and used `react-router-dom`.
- Used `axios` for network calls.
- Search functionlaity is optimized by debouncing the input.

https://github.com/abhishek28069/ihub_assessment/assets/38246372/a643624a-17e6-42e4-ba3c-41c7c1331487

