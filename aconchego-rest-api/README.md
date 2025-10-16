# Aconchego Coffee Shop - REST API

A comprehensive REST API for managing Aconchego Coffee Shop's online presence, including shopping, menu, reservations, contact, and events.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email service
- **Docker** - Containerization for development

## Features

### 1. Shopping System
- Browse available products with prices, names, descriptions, and images
- Guest checkout flow with order creation
- Email confirmation for orders
- Admin product management (CRUD)
- Order tracking and management

### 2. Menu Management
- Display menu items grouped by category
- Public menu viewing
- Admin menu item management (create/delete)

### 3. Reservation System
- Customer reservation requests (name, phone, email, party size, date/time)
- Admin reservation management
- Confirm reservations and assign table numbers
- Track reservation status (pending, confirmed, cancelled, completed)

### 4. Contact Form
- Customer inquiries submission
- Admin contact message management
- Status tracking (new, read, responded)

### 5. Events
- Public event listings
- Admin event management (create, list, delete)
- Event details with dates, times, and descriptions

## Project Structure

```
aconchego-rest-api/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection configuration
│   ├── controllers/
│   │   ├── productController.ts  # Product/shopping logic
│   │   ├── orderController.ts    # Order processing and checkout
│   │   ├── menuItemController.ts # Menu management
│   │   ├── reservationController.ts # Reservation handling
│   │   ├── contactController.ts  # Contact form handling
│   │   └── eventController.ts    # Event management
│   ├── models/
│   │   ├── Product.ts           # Product schema
│   │   ├── Order.ts             # Order schema
│   │   ├── MenuItem.ts          # Menu item schema
│   │   ├── Reservation.ts       # Reservation schema
│   │   ├── Contact.ts           # Contact schema
│   │   └── Event.ts             # Event schema
│   ├── routes/
│   │   ├── productRoutes.ts     # Product endpoints
│   │   ├── orderRoutes.ts       # Order endpoints
│   │   ├── menuRoutes.ts        # Menu endpoints
│   │   ├── reservationRoutes.ts # Reservation endpoints
│   │   ├── contactRoutes.ts     # Contact endpoints
│   │   └── eventRoutes.ts       # Event endpoints
│   ├── utils/
│   │   └── emailService.ts      # Email sending utility
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── dist/                        # Compiled JavaScript (generated)
├── docker-compose.yml           # MongoDB container setup
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment variables template
└── .gitignore                  # Git ignore rules
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aconchego-rest-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/aconchego
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   EMAIL_FROM=Aconchego Coffee Shop <noreply@aconchego.com>
   ```

4. **Start MongoDB with Docker**
   ```bash
   docker-compose up -d
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server (requires build first)

## API Endpoints

### Products (Shopping)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | List all available products | Public |
| GET | `/api/products/:id` | Get product by ID | Public |
| POST | `/api/products` | Create new product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Orders (Checkout)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order (guest checkout) | Public |
| GET | `/api/orders` | List all orders | Admin |
| GET | `/api/orders/:id` | Get order by ID | Admin |
| PATCH | `/api/orders/:id/status` | Update order status | Admin |

### Menu

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/menu` | List menu items by category | Public |
| GET | `/api/menu/:id` | Get menu item by ID | Public |
| POST | `/api/menu` | Create menu item | Admin |
| PUT | `/api/menu/:id` | Update menu item | Admin |
| DELETE | `/api/menu/:id` | Delete menu item | Admin |

### Reservations

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/reservations` | Create reservation request | Public |
| GET | `/api/reservations` | List all reservations | Admin |
| GET | `/api/reservations/:id` | Get reservation by ID | Admin |
| PATCH | `/api/reservations/:id/confirm` | Confirm and assign table | Admin |
| PATCH | `/api/reservations/:id/status` | Update reservation status | Admin |
| DELETE | `/api/reservations/:id` | Delete reservation | Admin |

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact message | Public |
| GET | `/api/contact` | List all messages | Admin |
| GET | `/api/contact/:id` | Get message by ID | Admin |
| PATCH | `/api/contact/:id/status` | Update message status | Admin |
| DELETE | `/api/contact/:id` | Delete message | Admin |

### Events

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/events` | List all events | Public |
| GET | `/api/events/:id` | Get event by ID | Public |
| POST | `/api/events` | Create event | Admin |
| PUT | `/api/events/:id` | Update event | Admin |
| DELETE | `/api/events/:id` | Delete event | Admin |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |

## Example Requests

### Create Order (Checkout)

```bash
POST /api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "items": [
    {
      "productId": "64abc123...",
      "quantity": 2
    }
  ]
}
```

### Create Reservation

```bash
POST /api/reservations
Content-Type: application/json

{
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "customerPhone": "+1234567890",
  "peopleQuantity": 4,
  "reservationDate": "2025-10-20",
  "reservationTime": "19:00"
}
```

### Confirm Reservation (Admin)

```bash
PATCH /api/reservations/:id/confirm
Content-Type: application/json

{
  "tableNumber": 5,
  "notes": "Window seat requested"
}
```

## Database Models

### Product
- name, description, price, image, available, timestamps

### Order
- customerName, customerEmail, customerPhone
- items (array of productId, productName, quantity, price)
- totalAmount, status, timestamps

### MenuItem
- name, description, category, price, image, available, timestamps

### Reservation
- customerName, customerEmail, customerPhone
- peopleQuantity, reservationDate, reservationTime
- tableNumber, status, notes, timestamps

### Contact
- name, email, subject, message, status, timestamps

### Event
- title, description, eventDate, eventTime, image, location, timestamps

## Development

The API follows a simple MVC-like architecture:
- **Models** - Data schemas and validation (Mongoose)
- **Controllers** - Business logic and request handling
- **Routes** - Endpoint definitions and routing

## Notes

- All admin endpoints should be protected with authentication in production
- Email service requires valid SMTP credentials
- MongoDB must be running before starting the server
- Images are stored as URLs (consider adding file upload in production)

## License

ISC
