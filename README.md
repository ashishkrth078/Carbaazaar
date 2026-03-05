# Carbaazaar

A REST API for managing vehicles.

## Database

This API uses MongoDB as the database for persistent storage of vehicle data.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3000

Open http://localhost:3000 in your browser to access the web interface.

## Deployment

### Using Docker Compose (Recommended)

1. Ensure Docker and Docker Compose are installed on your server.

2. Clone the repository and navigate to the project directory.

3. Run the following command to start the application and database:
   ```bash
   docker-compose up -d
   ```

4. The application will be available at `http://your-server-ip:3000`

5. To stop the application:
   ```bash
   docker-compose down
   ```

### Hosting on a Domain

To host on a custom domain, you can use a reverse proxy like Nginx:

1. Install Nginx on your server
2. Configure a server block to proxy requests to `http://localhost:3000`
3. Point your domain's DNS to your server's IP

Example Nginx config:
```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Manual Deployment

1. Install Node.js and MongoDB on your server.

2. Set environment variables:
   ```bash
   export MONGODB_URI=mongodb://localhost:27017/carbaazaar
   export PORT=3000
   ```

3. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   ```

### Environment Variables

- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/carbaazaar)
- `PORT`: Port for the application (default: 3000)

## API Endpoints

### Create Vehicle
- **POST** `/vehicles`

Request body:
```json
{
  "vin": "MA3FJEB1S00987654",
  "registrationNumber": "KA01AB1234",
  "make": "Maruti",
  "model": "Swift",
  "year": 2022
}
```

Response: The created vehicle object.

### Add Service Record
- **POST** `/vehicles/{vin}/services`

Request body:
```json
{
  "serviceCenterId": "SC102",
  "mileage": 12000,
  "serviceType": "Periodic Service",
  "totalCost": 3500
}
```

Response: The created service record object.

### Get Vehicle History
- **GET** `/vehicles/{vin}/history`

Response:
```json
{
  "ownerHistory": [],
  "serviceRecords": [],
  "insurance": [],
  "accidents": []
}
```

The response includes arrays for owner history, service records, insurance, and accidents.

### List All Vehicles
- **GET** `/vehicles`

Response: Array of vehicle summaries (vin, registrationNumber, make, model, year).