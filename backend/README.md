# 📦 MODULUS ERP - Backend API

**Robust Node.js + Express.js API Layer for MODULUS ERP**

The backend provides secure, role-scoped endpoints for user management, task assignment, leave processing, and real-time dashboard analytics.

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file based on `.env.example`:
   ```text
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/modulus-erp
   JWT_SECRET=modulus-erp-super-secret-key
   JWT_EXPIRES_IN=24h
   CORS_ORIGIN=http://localhost:3000
   NODE_ENV=development
   ```

3. **Database Seed (Crucial):**
   Run the seed script to initialize roles (Admin, Manager, Employee) and test users:
   ```bash
   npm run seed
   ```

4. **Start Development Server:**
   ```bash
   npm run dev # node --watch src/server.js
   ```

---

## 🛠️ Features

### 🛡️ Authentication & RBAC
- **JWT Middleware**: Validates incoming tokens and attaches user context (`req.user`) to each request.
- **Role Enforcement**: Custom logic ensures only authorized roles can access specific modules (e.g., Only Admins can create/delete users).

### 📊 Service-Oriented Architecture
The backend uses a **Controller-Service-Model** pattern:
- **`src/modules/`**: Contains core modules (Auth, Users, Tasks, Leaves).
- **`src/middleware/`**: Handles authentication, request logging, and validation.
- **`src/config/`**: Centralized environment and DB configuration.

### 📈 Database Aggregation
- Uses **Mongoose Aggregation Pipelines** to compute dashboard statistics for each role in real-time.

---

## 🔗 Core API Endpoints

| Area      | Root Path        | Purpose                                      |
| --------- | ---------------- | -------------------------------------------- |
| **Auth**  | `/api/auth`      | Login, token management                      |
| **Users** | `/api/users`     | User CRUD (Admin-only), Global Profiles      |
| **Tasks** | `/api/tasks`     | Assignment, status updates                   |
| **Leaves**| `/api/leaves`    | Request creation, Manager approval workflows |
| **Stats** | `/api/dashboard` | Role-scoped aggregated analytics             |

---

**MODULUS ERP Backend** · Scalable SaaS Infrastructure
