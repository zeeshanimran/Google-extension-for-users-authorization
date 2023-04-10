## Chrome Table Extension
Chrome Table Extension is a Google Chrome extension that allows users to securely store a secret and view it after signing in with a password. The secret is encrypted and stored locally, and the user is prompted to create a new secret on installation. The extension uses React.js for the front-end UI and the Chrome Extension API for interacting with the browser and storing data.

## Getting Started
To install the extension, simply download the code from this repository and add it to your Chrome browser as an unpacked extension.

## Usage
Upon installation, the extension will prompt the user to create a new secret. Once the secret is generated, the user will be prompted to set a password to protect the secret. The password must be entered twice to confirm it. After the password is set, the user can log in to view the secret. The user can also regenerate the secret or log out at any time. If the user logs out, the extension will return to its initial state and prompt the user to create a new secret and password.

## Development
To develop the extension, you will need to have Node.js and npm installed on your machine. After cloning the repository, run npm install to install the required dependencies.

The extension is divided into two parts: the front-end UI (located in src/) and the background script (located in public/background.js). The front-end UI uses React.js and is located in src/app.js To start the development server for the front-end, run npm start. To build the front-end for production, run npm run build.

The background script uses the Chrome Extension API to interact with the browser and store data. The script is located in public/background.js. To build the background script for production, run npm run build-background.




