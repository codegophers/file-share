# FileShare

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Setup

First install the dependencies:

```bash
npm install
```


Then set your firebase credentials (we have to put them in a file and
  [can't use environmental variables](https://github.com/angular/angular-cli/issues/2625#issuecomment-253868675)):

```bash
echo "export default {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  storageBucket: '...',
  messagingSenderId: '...'
};" > ./src/app/firebaseConfig.ts
```

Set the Firebase Realtime Database security rules to:

```
{
  "rules": {
    ".read": true,
    "feeds": {
      "$feed_id": {
      	".validate": "newData.isString()"
      },
      ".write": "root.child('admins').child(auth.uid).exists()"
    },
    "files": {
      ".indexOn": ["feed"],
      "$file_id": {
        "name": {
          ".validate": "newData.isString()"
        },
        "url": {
          ".validate": "newData.isString()",
        },
        "feed": {
          ".validate": "root.child('feeds/'+newData.val()).exists()"
        },
        "$other": {
          ".validate": false
        }
      },
      ".write": "auth.uid !== null"
    }
  }
}
```

Set Firebase Storage security rules to:

```
service firebase.storage {
  match /b/test-a1c55.appspot.com/o {
    match /{allPaths=**} {
      // Only allow uploads of any image file that's less than 250MB
      allow write: if request.auth != null
      						 && request.resource.size < 250 * 1024 * 1024;
      allow read: if request.auth != null;
    }
  }
}
```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
