## Node Services

This folder is reserved for Node.js-based services that complement the Python backend.

### Possible responsibilities

- Real-time gateway (WebSocket server) bridging sensors/trucks and the dashboard.
- Background workers for asynchronous tasks (notifications, batch analytics).
- Adapters or proxies for LPWAN/IoT platforms, if they expose Node-friendly SDKs.

### Suggested structure

- `gateway/` – real-time communication (WebSockets, MQTT bridge, etc.).
- `workers/` – background job processors.
- `shared/` – shared utilities and type definitions.

Each service can be its own Node project with its own `package.json`.

