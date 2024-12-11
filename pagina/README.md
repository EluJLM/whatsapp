# Getting Started with Create React App y deploy to Firebase

### `npm install`
esto instalara todos lo necesarrio

### `npm start`

para iniciar el desarrollo si deseas

### `npm run build`

esto creta la carpeta `build` que se manda a firebase

## `deploy to Firebase`

### `firebase init`

Are you ready to proceed? (Y/n) -> you write 'Y';

>( ) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys -> yo press space
>(*) Hosting: Configure files for .... -> you press enter

What do you want to use as your public directory? (public) -> you delect the word public and you write build and you press enter

? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)  you write N
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
? File build/404.html already exists. Overwrite? No
i  Skipping write of build/404.html
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!

### `Update the firebase.json file to`

{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
this is done so that Firebase sends any router to the index

### `firebase deploy` 

and that'is it, you can test the application if you already have the bot running



