# Frontend Documentation - Vue.js App

This document briefly explains the architectural design and functional specifications of the
Vue.js frontend application, which acts as a user interface for a Lesson Scheduling platform with the addition of a dedicated chatbot.

## Instalation

To locally run the vue app, run the following commands
```
cd MindBloom_vue_app
npm install
npm run dev
```

## Organization and structure

**Project Structure**

Given the modular and reactive principals that Vue.js is built on, it's a standard practice to have a well structured and organised folder structure. Mine was managed as follows: 

/src/api: Contains a file fetchAPI.js that orchestrates the communication with the backend.
/src/assets: Contains _some_ of the .css files, the app logo as a vue component and .svg file.
/src/components: Contains most of the application's component excluding views (cards, header, modals, etc.).
/src/router: Contains the index.js file that orchestrates the vue routing throughout the pages.
/src/store: Contains a file store.js that allows us to store global reference objects and commonly used functions.
/src/utils:  Contains functional js files such as input validators, supabase state checker, etc.
/src/views:  Contains all pages or views with their respective css files.

## Hosting

The application is currently being hosted on GitHub pages (https://kitchentile.github.io/MindBloom_Front_End/), with future plans for alternative site hosting.


