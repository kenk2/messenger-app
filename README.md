# Messenger App

This is a full stack application that implements a chat app with real-time communication. Become a guest user and start chatting today!

# Installation

1. `yarn`
2. Create a `.env` file. In there, specifiy:

```
DATABASE_URL=Your URL goes here
DATABASE_PASSWORD=Your Password goes here
```

This runs off of [ElephantSQL](https://elephantsql.com). You can sign up for an account to connect to your own database instance.

3. Run `yarn migrate:up`. This will run the migrations necessary for the database to support the application.
4. `yarn dev` and you should be ready to go!
5. OPTIONAL: To remake the tables, just do `yarn migrate:downup`

# Core Technologies
- TypeScript React
- Socket.io
- NextJS
- PostGreSQL
- React Query
- React Testing Library + Jest

# Usage

You can login as a random user. The user will persist for the session. You can logout by clicking the top-right button with your username and avatar with it.

Not that logging out means you can never login with the same account again. However you will still be able to see your past messages from a past account.

When you first login, you'll be able to see the past conversations up to 50 messages ago.

# Troubleshooting

If you're using the publicly running instance, note that Render will cause the app to sleep after 15 minutes of inactivity due to the free-tier container settings. If it takes a long time to load the page, come back later to see the instance up and running. Also, if it takes a long time to connect to the socket, you can usually fix the connection by refreshing the page. 

# Demo

![Demonstration](https://i.imgur.com/3hmPwKF.gif)
