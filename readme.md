# DigiMart E-Commerce Application

A full stack e-commerce application built with modern web technologies.

## Tech Stack

### Frontend

- React.js with Vite
- Tailwind CSS
- Zustand
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary (for image storage)
- Nodemailer
- Mongoose

### Payment Integration

- SSL Commerz Payment Gateway

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager
- MongoDB account
- Cloudinary account
- SSL Commerz sandbox account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/digimart.git
cd digimart
```

2. Install concurrently & pnpm

```bash
npm i
npm i -g pnpm
```

2. Install dependencies for both frontend and backend

```bash
npm run install-all
```

This command will concurrently install dependencies for both the frontend and backend applications.

### Environment Setup

1. Backend Configuration (.env)

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=<YOUR_MONGO_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
CLOUDINARY_CLOUD_NAME=<CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<CLOUDINARY_API_SECRET>
STORE_ID=<STORE_ID>
STORE_PASSWORD=<STORE_PASSWORD>@ssl
API_BASE_URL=http://localhost:5000
EMAIL_USER=<EMAIL_USER>
EMAIL_PASSWORD=<EMAIL_PASSWORD>
```

2. Frontend Configuration (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Running the Application

To start both **backend** and **frontend** at the same time from the root folder, run the following command:

```bash
npm run dev
```

### What This Does:

- Starts the **backend** server
- Starts the **frontend** application
- Runs both processes **simultaneously** using `concurrently`

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000/api/v1`.

## Be Admin

After registering an account and verifying your email address, go to **MongoDB** and update the user's role to **admin**. This will grant access to the admin dashboard, allowing you to manage categories and add products.
