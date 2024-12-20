# Quiz Application

This is a full-stack quiz application where users can select quizzes, answer questions, and see their scores. The app is containerized using Docker and includes the following:

- **Frontend**: React (served via Nginx in production).
- **Backend**: Node.js with Express.
- **Database**: MySQL.
- **Orchestration**: Docker Compose.

---

## Features

- Dynamic quiz selection and question answering.
- Backend API to fetch quizzes and questions.
- Toast notifications for errors and validation.
- Optimized production setup using Nginx.

---

## Prerequisites

Ensure you have the following installed on your system:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **jq**: [Install jq](https://jqlang.github.io/jq/download/) (Optional)

---

## Running the Application

Follow these steps to run the application:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Build and Run the Containers

```bash
docker-compose up -d --build
```

### 3. Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:8080`.
- **Backend API**: Accessible at `http://localhost:3001/api`.

---

## Application Details

### **Frontend**

- Built with React.
- Served using Nginx in production.
- Proxying API requests to the backend (`/api`).

### **Backend**

- Node.js with Express.
- Provides RESTful API endpoints:
  - `GET /quizzes`: Fetch all quizzes.
  - `GET /quizzes/:id/questions`: Fetch questions for a specific quiz.
  - `POST /submit`: Submit answers and calculate scores.

### **Database**

- MySQL database to store quiz and question data.
- The schema is initialized using `quiz-data.sql`. You may use the utility script `refresh-data.sh -f /path/to/quiz-data.json` to update the database whenever changes are made to the `quiz-data.json` file. Please ensure that `quiz-data.json` is formatted correctly and that there are no errors when running the utility script. 

---

## Environment Variables

The application uses the following environment variables:

### Backend

- **DB_HOST**: Database hostname (default: `db` for Docker networking).
- **DB_USER**: Database user (default: `username`).
- **DB_PASSWORD**: Database password (default: `pass`).
- **DB_NAME**: Database name (default: `quiz_app`).

### Frontend

- **REACT_APP_API_URL**: Backend API URL (default: `http://localhost:3001`).

---

## Stopping the Application

To stop the application and remove containers:

```bash
docker-compose down
```

To stop and remove all volumes (including the database):

```bash
docker-compose down -v
```

---

## Notes

- Ensure that port `8080` (frontend), `3001` (backend), and `3306` (MySQL) are not occupied by other services.
- When starting the app for the first time, you may see "No quizzes available" on the frontend. Give it a minute for the database to setup and inject some test data, then refresh the page. 
- If you need to make changes to the app, rebuild the containers using:

```bash
docker-compose up -d --build
```

---

## Troubleshooting

1. **Frontend Not Loading?**

   - Check if the Nginx container is running: `docker ps`.
   - Ensure React's production build was created successfully during the build process.

2. **Backend API Errors?**

   - Check the logs of the backend container: `docker logs <backend-container-id>`.

3. **Database Connection Issues?**
   - Ensure the MySQL service is running: `docker ps`.
   - Verify environment variables for the database in `docker-compose.yml`.

---

## Future Improvements

- Add authentication and player management.
- Add more robust error handling.
- Improve quiz management (e.g., create quizzes dynamically).

