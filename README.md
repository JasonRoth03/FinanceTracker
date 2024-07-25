# FinanceTracker

FinanceTracker is a simple finance tracking application that allows users to register, log in, and manage their transactions. Users can view and delete transactions associated with their accounts.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Continuous Integration](#continuous-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
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
   git clone https://github.com/JasonRoth03/FInanceTracker.git
   cd FInanceTracker
   cd frontend
