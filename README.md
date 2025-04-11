# Real-Time Analytics Backend

This backend simulates website traffic analytics data and provides both REST API (polling) and WebSocket (real-time streaming) access.  
Designed for Render deployment, it supports dynamic analytics for integration with frontend dashboards.

---

## Features

- REST API for polling simulated analytics data  
- WebSocket stream for real-time analytics  
- Path-based routing for `/`, `/api`, and `/api/analytics`  
- Live backend hosted on Render  
- Simple, clean, modular source code

---

## Project Structure

```
backend/
├── README.md                 # Project documentation
├── package.json              # Project dependencies and metadata
├── package-lock.json         # Dependency lock file
├── node_modules/             # Installed packages
└── source/                   # Source code for backend logic
    ├── server.js             # Entry point (HTTP + WebSocket server)
    ├── routes.js             # REST API endpoint for analytics
    ├── socket.js             # WebSocket upgrade + data stream handler
    └── mockDataGenerator.js  # Generates mock analytics data
```

---

## Requirements

- Node.js (v14 or higher recommended)  
- npm (Node Package Manager)

---

## Getting Started Locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the backend server

   ```bash
   node source/server.js
   ```

   Once started, the server exposes:

   - REST API: `http://localhost:4000/api/analytics`  
   - WebSocket: `ws://localhost:4000/api/analytics`  
   - Also supports:  
     - `http://localhost:4000/`  
     - `http://localhost:4000/api`  
     - `ws://localhost:4000/`  
     - `ws://localhost:4000/api`

---

## Available Endpoints (Render Deployment)

### REST API (Polling)

- `GET https://realtime-analytics-backend.onrender.com/api/analytics`  
  Returns mock analytics data in JSON format.

**Example Response:**

```json
{
  "timestamp": "2025-04-12T12:01:00Z",
  "active_users": 87,
  "page_views": 152,
  "avg_session_duration": 4.6
}
```

---

### WebSocket (Streaming)

- `wss://realtime-analytics-backend.onrender.com/api/analytics`  
  Emits mock data every 1.5 seconds  
  Sends welcome message once on connection to any of these paths:
  - `/`
  - `/api`
  - `/api/analytics`  
  Streams real-time data only on `/api/analytics`  
  Other paths are rejected

---

### Also Supported

- `GET https://realtime-analytics-backend.onrender.com/`  
- `GET https://realtime-analytics-backend.onrender.com/api`  
- `wss://realtime-analytics-backend.onrender.com/`  
- `wss://realtime-analytics-backend.onrender.com/api`

---

## Data Format

| Field                | Type    | Description                                |
|----------------------|---------|--------------------------------------------|
| timestamp            | String  | ISO 8601 timestamp of the sample           |
| active_users         | Number  | Simulated count of current users           |
| page_views           | Number  | Simulated total page views                 |
| avg_session_duration | Number  | Average session duration (in minutes)      |

---

## Use Cases

- Integration with real-time dashboards (e.g., built in Flutter)  
- Testing real-time frontend visualizations  
- Demo setups for analytics pipelines or UX prototyping

---

## Challenges, Assumptions, and Improvements

### Challenges Solved

- **Unified endpoint for HTTP and WebSocket**  
  Enabled `/api/analytics` to handle both REST and WebSocket by separating logic internally during protocol upgrade.

- **Extra slashes or malformed paths**  
  Normalized all paths to handle edge cases like `//api` or `/api//analytics` safely.

- **Consistent behavior on all allowed paths**  
  All valid paths (`/`, `/api`, `/api/analytics`) return meaningful responses or welcome messages.

- **Socket hang-up errors in Postman**  
  Tracked and fixed issues by refining WebSocket upgrade flow and matching only allowed routes.

- **Clean, modular backend structure**  
  Split logic into separate files for server, WebSocket, routes, and mock data to allow better debugging and future scalability.

---

### Assumptions Made

- The app is deployed via Render on a public endpoint  
- Same mock analytics format used for both protocols  
- Testing tools like Postman and browser-based WebSocket clients will be used

---

### Improvements Done

- Dual-protocol support (`HTTP` + `WebSocket`) on same route  
- Path normalization logic for robustness  
- Added clear error handling and logging  
- Immediate data push after WebSocket connect  
- Structured responses for seamless frontend integration

---

## License

This project is open for educational and personal use.  
Feel free to modify or integrate it into your own tools.