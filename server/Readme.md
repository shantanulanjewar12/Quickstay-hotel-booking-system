## Backend Server Setup

This section outlines the steps to set up the backend server for QuickStay, including package installations, Clerk integration for user management, and API creation for handling user and hotel data.

### Package Installation

To create our backend server, navigate to the `server` folder in your project's root directory and open an integrated terminal.

1.  **Initialize npm:**
    ```bash
    npm init -y
    ```

2.  **Install Core Packages:**
    Install the necessary packages for server functionality, environment variables, CORS, database interaction, and image handling.
    ```bash
    npm install express dotenv cors mongoose cloudinary multer svix
    ```

3.  **Set Module Type:**
    Add the following line to your `package.json` file to enable ES module syntax:
    ```json
    "type": "module",
    ```

### Nodemon Setup

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

1.  **Install Nodemon:**
    ```bash
    npm install --save-dev nodemon
    ```

2.  **Configure `package.json` Script:**
    Modify the `scripts` section in your `package.json` file. Change the `start` script (or add a new `server` script) to use nodemon:
    ```json
    "scripts": {
      "server": "nodemon server.js"
    },
    ```
    Now, whenever you run `npm run server`, it will execute the `nodemon server.js` script, automatically restarting the server on file changes.

### Clerk Integration in Backend

We integrate Clerk to securely manage user authentication and retrieve user data.

-   **Clerk Webhook:**
    Clerk webhooks are used to receive notifications about user events (e.g., user created, updated, deleted).
    The Clerk webhook will be accessible at the URL `/api/clerk`. You will need to provide this URL in your Clerk Dashboard settings to enable event forwarding.

### Storing Data in Database

Data is stored in the database through Mongoose models, which define the schema for different data entities.

-   **User Account Actions:**
    By integrating Clerk with Vercel, any new user creation, updates, or deletions will automatically be stored in your database. This ensures that your database remains synchronized with your user authentication system.

### API Created for Users

Dedicated API endpoints are created to handle user-related operations.

-   **Files:** `userController.js` and `userRoutes.js`
    These files contain the logic for handling user data, such as fetching user profiles, updating user information, and other user-specific actions.

### API for Hotel

An API is created to manage hotel data, allowing for the storage and retrieval of hotel listings.

-   **Functionality:**
    This API handles operations related to hotels, including adding new hotels, retrieving hotel details, updating hotel information, and managing room listings.
