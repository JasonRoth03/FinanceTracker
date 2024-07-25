# FinanceTracker

FinanceTracker is a simple finance tracking application that allows users to register, log in, and manage their transactions. Users can view and delete transactions associated with their accounts.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Continuous Integration](#continuous-integration)
- [License](#license)

## Features
- User registration and login
- View transactions
- Delete transactions
- Categorize transactions

## Tech Stack
- **Frontend:** React
- **Backend:** Spring Boot, Spring Security (JWT for authentication)
- **Database:** MongoDB
- **Hosting:** 
  - Frontend: Netlify
  - Backend: Google Cloud Run

## Architecture
- **Frontend:** Built with React, hosted on Netlify
- **Backend:** Built with Spring Boot and Spring Security using JWT for authentication, hosted on Google Cloud Run
- **Database:** MongoDB for storing user details, transactions, and categories

## Setup and Installation

### Prerequisites
- Node.js and npm
- Java Development Kit (JDK)
- MongoDB

### Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone https://github.com/JasonRoth03/FinanceTracker.git
   cd FinanceTracker
2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
3. **Backend Setup**
   ```bash
   cd ../backend
   
   //Edit the existing application.properties file located in src/main/resources with the following properties:
   
   spring.application.name=FinanceTracker
   spring.data.mongodb.database=your_database
   spring.data.mongodb.uri=mongodb+srv://<MONGO_USER>:<MONGO_PASSWORD>@<MONGO_CLUSTER>
   jwt.secret-key=your_jwt_secret_key
   jwt.expiration=your_jwt_expiration_time
   server.port=your_server_port

## Usage

1. **Register a New Account**
   - Navigate to the registration page on the frontend application.
   - Fill in the required information and submit the form to create a new account.

2. **Log In**
   - Go to the login page.
   - Enter your credentials (username and password).
   - Upon successful login, a JWT (JSON Web Token) will be issued to authenticate subsequent requests.

3. **View Transactions**
   - Once logged in, you will be directed to the dashboard.
   - Here, you can view all transactions associated with your account.

4. **Manage Transactions**
   - To delete a transaction, locate it on the dashboard.
   - Click the delete button associated with the transaction you wish to remove.
   - The transaction will be removed from your list.

### Authentication
- The application uses JWT (JSON Web Tokens) for secure authentication and session management.
- The token is included in the Authorization header of requests to protected endpoints.

## Continuous Integration

This project uses Continuous Integration (CI) to automate the build, test, and deployment processes. The CI setup includes:

- **Automated Builds:**
  - The CI pipeline automatically builds both the frontend and backend applications on each push or pull request to the GitHub repository.
  - Builds ensure that the code compiles and runs correctly.

- **Frontend Deployment:**
  - The frontend application is deployed to Netlify.
  - Netlify automatically builds and deploys the latest changes from the GitHub repository.
  - Continuous deployment is configured to trigger a new build and deployment whenever changes are pushed to the main branch.

- **Backend Deployment:**
  - The backend application is deployed to Google Cloud Run.
  - The CI pipeline builds a Docker image of the backend and pushes it to Google Container Registry.
  - Google Cloud Run then deploys the new image, ensuring that the latest changes are live.
  - Deployment is automatically triggered whenever changes are pushed to the main branch of the repository.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
