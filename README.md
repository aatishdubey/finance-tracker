# Finance Tracker

This repository contains a finance tracker application that helps you manage your finances. It consists of both server-side and client-side code. The server side uses Firebase Cloud Firestore for the database and has REST API endpoints built with Express. The frontend is a React app built using Ant Design for components, Firebase for authentication, React-Query for data fetching, and TypeScript. The client-side code is bundled using Vite.

## Features

- Track your income and expenses
- Track your savings and investment data
- View history
- Analyze your spending patterns
- Secure user authentication with Firebase

## Technologies Used

- Server-side:
  - Firebase Cloud Firestore
  - Express

- Client-side:
  - React
  - Ant Design
  - Firebase Authentication
  - React-Query
  - TypeScript
  - Vite

## Prerequisites

To run this application locally, you need to have the following software installed on your system:

- Node.js
- npm or yarn
- Firebase account and project
- Firebase CLI (Command Line Interface)

## Getting Started

Follow the steps below to set up and run the application on your local machine.

1. Clone this repository:

   ```shell
   git clone https://github.com/aatishdubey/finance-tracker.git
   ```

2. Navigate to the project directory:

   ```shell
   cd finance-tracker
   ```

3. Install the dependencies:

   ```shell
   cd finance-tracker-be
   npm install
   # and
   cd finance-tracker-fe
   npm install
   ```

4. Configure Firebase:

   - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore database and Authentication services.
   - Generate your Firebase configuration keys.
   - Copy the Firebase configuration keys into the `.env` file. You can use the `.env.example` file as a template.

5. Start the server:

   ```shell
   cd finance-tracker-be && npm start
   ```

   This will start the backend server on `http://localhost:3000`.

6. Start the client:

   ```shell
   cd finance-tracker-fe && npm run dev
   ```

   This will start the client on `http://127.0.0.1:5173`.

8. Open your web browser and visit `http://127.0.0.1:5173` to see the finance tracker application.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## License

This project is licensed under the MIT License.
