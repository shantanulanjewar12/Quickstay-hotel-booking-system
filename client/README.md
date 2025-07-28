## Frontend Setup: React with Vite

This section details the frontend development environment, built using React and Vite, emphasizing key configurations and tools.

### React + Vite Template

This project utilizes a minimal setup with **React** and **Vite**, offering features like Hot Module Replacement (HMR) for a fast development experience and pre-configured ESLint rules for code quality.

Currently, Vite provides two official plugins for React:

* **`@vitejs/plugin-react`**: Uses [Babel](https://babeljs.io/) for Fast Refresh.
* **`@vitejs/plugin-react-swc`**: Uses [SWC](https://swc.rs/) for Fast Refresh, often providing faster performance.

#### Expanding the ESLint Configuration

For production applications, it's recommended to enhance the ESLint configuration. If you plan to use TypeScript, consider integrating type-aware lint rules. Refer to the official [TS template](https://vitejs.dev/guide/features.html#typescript) documentation for instructions on setting up TypeScript and [typescript-eslint](https://typescript-eslint.io/) in your project.

### Running the Project

To start the frontend development server:

1.  Navigate into the `client` directory:
    ```bash
    cd client
    ```
2.  Run the development command:
    ```bash
    npm run dev
    ```

### React Router Setup

**React Router DOM** is used to handle client-side routing, enabling navigation between different pages without full page reloads.

1.  **Installation:**
    ```bash
    npm install react-router-dom
    ```

2.  **Configuration:**
    In your `main.jsx` file (or equivalent entry point), wrap your application with `BrowserRouter` from `react-router-dom` to enable routing:
    ```javascript
    import { BrowserRouter } from 'react-router-dom';
    // ... other imports
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );
    ```

### User Authentication with Clerk

**Clerk** is integrated for secure and streamlined user authentication.

-   Clerk's API or keys are used to manage user login and sign-up processes, providing robust authentication features for the application.

### Frontend Completion

At this stage, the entire frontend part of the QuickStay website has been completed, providing a fully interactive and responsive user interface.

### Backend Development

The backend of this website will be developed using **Node.js** and **Express.js**.

-   **Integration:** After the backend is developed, it will be seamlessly connected with the frontend to enable data exchange and full application functionality.
-   **Note on Vite Package:** While the frontend is built with Vite, the backend server itself uses Node.js and Express. Vite is a build tool primarily for frontend assets. The previous statement "The Backend is Created using Vite Package" is likely a misunderstanding; Vite bundles frontend assets, it does not create the Node.js/Express backend server itself.
