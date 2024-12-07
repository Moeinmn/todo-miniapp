#Todo Miniapp

This repository contains the frontend and backend of the application, with a Docker Compose configuration to run the entire stack locally using Docker.

#Prerequisites

Before you begin, ensure you have the following installed:

- Docker (including Docker Compose)
- Git

#Project Structure

- frontend/: Contains the frontend application.
- backend/: Contains the backend application.
- docker-compose.yml: Docker Compose configuration to manage frontend, backend, and database containers.
- db.sqlite: SQLite database file stored under the backend/data/ directory.

#Running the Application

Follow these steps to set up and run the application locally using Docker.

1. Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Build and Start the Application

Run the following command to build and start the Docker containers:

docker-compose up --build

This command will:

- Build Docker images for the frontend and backend services.
- Start both the frontend and backend containers.
- Create and mount a volume for the SQLite database (backend/data/db.sqlite).

3. Access the Application

Once the containers are running, you can access the following:

- Frontend: Open your browser and go to http://localhost:3000.
- Backend API: The backend will be available at http://localhost:9000.
  - Swagger Documentation: You can explore the backend API at http://localhost:9000/swagger.

4. Stopping the Application

To stop the running containers, run:

docker-compose down

This will stop and remove all running containers. Your SQLite database will be retained in the backend/data/db.sqlite file.

#Notes

- SQLite Database: The SQLite database is automatically created and stored at backend/data/db.sqlite.
  - **Important**: Currently, there is no volume defined for the database, so if you restart the containers, all database data will be lost.

- Port Mapping:
  - The frontend runs on port 3000.
  - The backend runs on port 9000.

Troubleshooting

- If you encounter issues with Docker, try rebuilding the images:

  docker-compose up --build

- Ensure there are no port conflicts, especially on ports 3000 (frontend) and 9000 (backend).

License

Include your project's license here (e.g., MIT, Apache 2.0, etc.)
