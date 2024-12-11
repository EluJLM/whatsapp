# Getting Started with Create React App and Deploy to Firebase

This guide provides step-by-step instructions to set up a React app and deploy it to Firebase Hosting.

## Setting Up the React App

1. **Install Dependencies**:
   ```bash
   npm install
   ```
   This command installs all the necessary dependencies for your React app.

2. **Start Development Server** (Optional):
   ```bash
   npm start
   ```
   This command starts the development server to preview your app locally.

3. **Build the App**:
   ```bash
   npm run build
   ```
   This command creates a `build` folder containing the optimized production-ready files.

## Deploying to Firebase Hosting

### Step 1: Initialize Firebase
Run the following command:
```bash
firebase init
```
Follow these steps:

1. **When prompted**, answer:
   - *Are you ready to proceed?* -> Type `Y` and press `Enter`.
2. **Select Hosting**:
   - Use the space bar to select `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`. Press `Enter`.
3. **Set Public Directory**:
   - When prompted *What do you want to use as your public directory?* type `build` and press `Enter`. (Replace the default `public`.)
4. **Single-Page App Configuration**:
   - *Configure as a single-page app (rewrite all URLs to /index.html)?* Type `N` and press `Enter`.
5. **GitHub Action Deploys**:
   - *Set up automatic builds and deploys with GitHub?* Type `N` and press `Enter`.
6. **File Overwrites**:
   - If prompted about overwriting `404.html` or `index.html`, select `No`.

Firebase initialization will complete, creating the necessary configuration files such as `firebase.json` and `.firebaserc`.

### Step 2: Update Firebase Configuration
Edit the `firebase.json` file to ensure proper routing:
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "/.*",
      "/node_modules/"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```
This ensures that Firebase redirects all routes to `index.html`.

### Step 3: Deploy the App
Run the following command:
```bash
firebase deploy
```
This will deploy your app to Firebase Hosting. Once complete, you can view your app using the provided Firebase URL.

---

Your React app is now live on Firebase Hosting!
