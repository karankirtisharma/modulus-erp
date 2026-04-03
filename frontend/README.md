# 🎨 MODULUS ERP - Frontend Application

**Modern React + Vite Frontend for MODULUS ERP**

The frontend provides localized dashboards for system roles, real-time analytics, and secure session management.

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   By default, the Vite server will proxy API requests to `http://localhost:5000/api`.

3. **Start Development Server:**
   ```bash
   npm run dev # vite --port=3000 --host=0.0.0.0
   ```

---

## 🛠️ Features

### 🏢 Modular Component Architecture
Built with reusable components and a clean directory structure:
- **`src/components/ui/`**: Reusable interface components (Stats cards, Badges, Modals).
- **`src/pages/`**: Role-scoped dashboards for Admins, Managers, and Employees.
- **`src/contexts/`**: Global authentication state and token management.

### 🛡️ Secure Navigation (AuthGuard)
- **ProtectedRoute**: Automatically detects user authentication and role, redirecting unauthorized users back to the login page.

### 🎨 Design System
- Styled with **Tailwind CSS**.
- Icons from **Lucide React**.
- Animations powered by **Framer Motion**.

---

## 📁 Frontend Structure

```text
├── src
│   ├── api         # Axios instance and interceptors
│   ├── components  # UI and Layout components
│   ├── contexts    # AuthContext & global state
│   ├── pages       # Role-based dashboard implementations
│   └── routes      # Private/Public route definitions
```

---

**MODULUS ERP Frontend** · Enterprise Resource Planning UX
