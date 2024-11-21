# Marketplace App

## Usage Requirements

- Node.js v20 or higher.
- Docker.
- Git.

## Running the Project Locally

### 1. Clone the Repository

- Use the following command in a Git terminal to clone the repository to your local machine: `git clone https://github.com/Enmanuel-TG/marketplace-miniproject.git`.
- Navigate into the project folder using `cd ./marketplace-miniproject/`.

### 2. Install Dependencies

- If the previous step was successful, you should have the project files. Next, install the dependencies for both the backend and frontend. Run the following commands:

  - For the backend: `cd ./backend/`, then `npm install`.
  - Open another terminal and install the frontend dependencies: `cd ./frontend/`, then `npm install`.

After completing these steps, all dependencies should be ready.

### 3. Configure Environment Variables

- In the `backend` and `frontend` folders, you will find files named `.env.example` that provide an example of how the environment variables should be named. You can rename this file or create a new one called `.env`, and fill it with your credentials.

### 4. Run the Project

- The database runs in a Docker container. To start it, execute the following command in the backend terminal: `sudo npm run docker`. If you are using Windows, you can use [Docker Desktop](https://www.docker.com/products/docker-desktop/).

- To start the backend, run `npm run dev` in its terminal.
- To start the frontend, run `npm run dev` in its terminal.

### 5. Open in the Browser

You can view the web application at [http://localhost:5173/](http://localhost:5173/) and access the API at [http://localhost:3000/](http://localhost:3000/).
