# React Native starter pack with JWT authentication

## :warning: This repo is no longer maintained

![](screens.png)

This is a boilerplate/starter pack for a React Native app, and Node.js back end. The main focus for this repo is the usage of JSON Web Tokens for authentication, including using a custom system for handling access tokens and refresh tokens.

> Please note: although this repo has recently been updated to look at some security concerns, it's still not production ready. Please be careful where tokens are stored, how they are transmitted to the server, and the expiry times of access and refresh tokens.

## Introduction

The front end app and back end server are split into 2 directories - `/app` and `/server`. Firstly, go in to each folder and run `npm install` to pull down the dependencies.

Then create a local MongoDB database on your machine - [follow this link](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) for assistance if needed.

You'll then need to add a `.env` file in to the `/app` and `/server` directories:

- In the `/server` directory, add in the MongoDB URI to your newly created `.env` file. For example: `MONGODB_URI_=mongodb://aaaaaaaaa:bbbbbbbbb@cccccccc.mlab.com:59187/aaaaaaa`.
- In the `/app` directory, add in the API URI (the Node server URI) to your second newly created `.env` file. For example: `API_URL=http://localhost:1140`.

You can then run the app and server instances separately:

- `react-native run-ios` (in /app)
- `npm start server` (in /server)

> The repo does not yet have a register section to get people in to the database, so you'll need to manually add people and use the credentials to log in. I'll try and get round to this soon, but in the meantime **I'm happy to receive pull requests** for a hand :)

## Navigation using Wix React Native Navigation

One of the key components in this repo is the fantastic [React Native Navigation](https://github.com/wix/react-native-navigation) by the folks at Wix. This enables fully native screens which are highly performant and easy to work with. The setup instructions on the [Wix docs](https://wix.github.io/react-native-navigation/#/installation-ios) are important including adding the AppDelegate.m file to Xcode.

The structure of the navigation is based on the recommended Github repo for [junedomingo's movieapp](https://github.com/junedomingo/movieapp), which shows how to split up the root index.ios.js file and reference the app.ios.js file in a newly created `src/` directory.

## Redux and Redux Form

Redux is another key component to the point where it would be trenemdously difficult to do without. With the help of Redux Thunk, the app is able to dispatch actions to update the store from any part of the app - important for handling the JWT access token and refresh token process.

[Redux Form](http://redux-form.com/7.0.3/) has also been used for form submissions which I think is another must-have when it comes to React Native development.

## Login/Authentication

The auth is a custom made JWT system which used a Node back end (in the `/server` directory). The JWT is generated using `jsonwebtoken`, and sent back to the client. On each request to the server, the JWT is checked to ensure it's valid, and if it is the request goes through. If it's not valid (i.e. it's expired), the redux middleware will request a new token from the server using a refresh token, and **fire off the originally failed request again with the new token**.

API endpoints in the Node back end protect routes from being accessed without a valid JWT.

The refresh token and auth token are stored on the user device. The refresh token is used in this project as it can be deleted from the server side, revoking user access. JWT is normally completely stateless, but this is a half way between stateless and session based.

## Errors

The app is using global errors with Redux integration. The ErrorBar component is to be inserted into each page level component and it is positioned absolute on top of screen. All errors must subscribe to the global redux state to use.

Error handling on the server is handled in an isolate file to help with maintainability, and may be moved elsewhere in a future version.

## Steps to take when unknown errors occur

- Close packager terminal and re-build app using `react-native run-ios`.
- Delete `/build` directory inside the `/ios` or `/android` directories, and re-run `react-native run-ios`.
- Delete node_modules and re-run `npm install`.
- Uninstall app from device or emulator and re-run.
- Run `npm start -- --reset-cache` and re-run.
