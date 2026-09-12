# Webhook Delivery Engine

A clean, asynchronous Webhook API service built with Node.js, Express, and PostgreSQL. It allows users to register target webhook URLs, bind event topics, and trigger real-time HTTP event payloads to configured endpoints.

---

## Features

- **User Authentication**: Secure user registration, authentication, and session handling using JWT and `bcrypt`.
- **Webhook Management**: Register, list, and delete custom target HTTP/HTTPS endpoints per user.
- **Event Subscriptions**: Bind specific event names (topics) to target webhook URLs.
- **Event Dispatching**: Broadcast event payloads to all subscribed webhook endpoints in real time.
- **Testing Utility**: Built-in HTTP receiver server (`tester.js`) for local payload verification.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (`pg`)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcrypt`, `cookie-parser`
- **Environment Configuration**: `dotenv`

---

## Project Structure

```text
webhook/
├── src/
│   ├── app.js              # Express application setup & middleware setup
│   ├── config/
│   │   └── db.js           # PostgreSQL pool configuration
│   ├── controllers/        # Request handlers (auth, webhook, event)
│   ├── middlewares/        # Authentication & validation middlewares
│   ├── repositories/       # Database queries & data access layer
│   ├── routes/             # API route definitions
│   └── services/           # Business logic & event dispatch engine
├── server.js               # Application entry point (Port 3000)
├── tester.js               # Standalone test receiver server (Port 4000)
├── .env                    # Environment variables
└── package.json            # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database instance

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key

# PostgreSQL Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=webhook_db
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the main server:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

3. Run the standalone test receiver (optional):
   ```bash
   node tester.js
   ```

---

## API Reference

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Authenticate user and issue JWT cookie | No |
| `POST` | `/auth/logout` | Clear authentication cookie | Yes |
| `DELETE` | `/auth/delete` | Delete user account | Yes |

### Webhook Management (`/webhook`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/webhook/register` | Register a target URL | Yes |
| `GET` | `/webhook/` | Retrieve user's registered webhooks | Yes |
| `DELETE` | `/webhook/delete` | Remove a registered target URL | Yes |

### Event Subscriptions & Dispatch (`/event`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/event/create` | Subscribe a target URL to an event topic | Yes |
| `GET` | `/event/event` | List registered event subscriptions | Yes |
| `DELETE` | `/event/delete` | Remove an event subscription | Yes |
| `POST` | `/event/send` | Trigger event dispatch to subscribed URLs | Yes |

---

## Local Webhook Testing

You can use `tester.js` to simulate a destination endpoint:
1. Start `node tester.js` (runs on `http://localhost:4000`).
2. Register `http://localhost:4000/tester` as your webhook URL via `POST /webhook/register`.
3. Create an event subscription via `POST /event/create`.
4. Trigger `POST /event/send` and inspect logs in the `tester.js` terminal.

---

## Future Roadmap

Planned enhancements for scalability and production readiness:

- **Redis Caching & Session Management**: Cache subscription lookups and user sessions for low-latency dispatch.
- **Rate Limiting**: Prevent abuse and manage request volume per client/IP.
- **Message Queues & Retries**: Implement BullMQ / RabbitMQ for durable background worker queues with exponential backoff retries.
- **Containerization**: Docker & Docker Compose setup for database, API, and worker services.
- **Web Frontend**: Web dashboard for monitoring dispatches, payloads, and delivery status logs.

---
