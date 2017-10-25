# **README**

## Introduction

**Instructions**

* react-native run-ios (in /app)
* npm start server (in /server)

**Overview**

* Using React Native and Node.js back end for API and DB
* React app is in /app and server is in /server
* The whole project is under git source control in the / directory, but there's also a git repo within /server to handle the heroku deployment
* Locally, app is run using "react-native run-ios"
* Locally, node server can be run by going to /server and running "npm run server" which spins up a server at localhost:1337
* The server has also been made on Heroku so mobile can test (as running locally relies on localhost URL). There's a config file in /app/src/config.js which contains API URL for local and heroku
* Debug logs by making shake gesture in simulator and selecting to debug remotely. (Installed redux-logger to help with this)
* Debug app data and visuals by running react-devtools in terminal (Installed react-devtools for this)

This is a test/playground app I have used to experiment with different elements of React Native development. The idea is that the sections can re-used in live projects. Below is a brief overview of the parts of the app I've incorporated.

### Navigation using Wix React Native Navigation

Needed to follow the instructions on the docs, including adding the AppDelegate.m file to Xcode. Use the [Wix docs](https://wix.github.io/react-native-navigation/#/installation-ios).

The structure of the navigation is based on the recommended Github repo for [junedomingo's movieapp](https://github.com/junedomingo/movieapp), which shows how to split up the root index.ios.js file and reference the app.ios.js file in a newly created src/ directory/

### Redux and Redux Form

Redux and [Redux Form](http://redux-form.com/7.0.3/) have been used for global state management on the app.

### Login/Authentication

The auth is a custom made JWT system which used a Node back end (in the /server directory). The JWT is generated using jsonwebtoken and express-jwt, and sent back to the client. On each request to the server, the JWT is checked to ensure it's valid, and if it is the request goes through. If it's not valid (i.e. it's expired), the redux middleware will request a new token from the server using a refresh token.

API endpoints in the Node back end protect routes from being accessed without a valid JWT.

The refresh token and auth token are stored on the user device. The refresh token is used in this project as it can be deleted from the server side, revoking user access. JWT is normally completely stateless, but this is a half way between stateless and session based.

### Errors

The app is using global errors with Redux integration. The ErrorBar component is to be inserted into each page level component and it is positioned absolute on top of screen. All errors must subscribe to the global redux state to use.

**Native Setup Stuff**

* Had to set up linking to allow for app to communicate with outside HTTP, and also for the app to be opened when clicking links (for Instagram auth for example). Followed React Docs but that made errro r in xcode. So moved to https://medium.com/react-native-training/deep-linking-your-react-native-app-d87c39a1ad5e

* This website said the Linking OpenURL is bad, and should use react-native-safari-view plugin http://rationalappdev.com/logging-into-react-native-apps-with-facebook-or-google/

**To do**

* Project doesnt have and config/env variables so **can't check into source control**
* Handle errors when token is invalid
* Find a way to invalidate the tokens on the server and then test invalid token errors
* Log user out if not valid token
* Sort a system for A/B testing
