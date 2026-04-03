import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/guards/ProtectedRoute';
import RoleProtectedRoute from './components/guards/RoleProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Pages
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeManagementPage from './pages/admin/EmployeeManagementPage';
import TaskManagementPage from './pages/admin/TaskManagementPage';
import LeaveManagementPage from './pages/admin/LeaveManagementPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerTasksPage from './pages/manager/ManagerTasksPage';
import ManagerLeavesPage from './pages/manager/ManagerLeavesPage';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeTasksPage from './pages/employee/EmployeeTasksPage';
import EmployeeLeavesPage from './pages/employee/EmployeeLeavesPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <AppLayout />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeeManagementPage />} />
            <Route path="tasks" element={<TaskManagementPage />} />
            <Route path="leaves" element={<LeaveManagementPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>

          {/* Manager Routes */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={['manager']}>
                  <AppLayout />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<ManagerDashboard />} />
            <Route path="tasks" element={<ManagerTasksPage />} />
            <Route path="leaves" element={<ManagerLeavesPage />} />
          </Route>

          {/* Employee Routes */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={['employee']}>
                  <AppLayout />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeDashboard />} />
            <Route path="tasks" element={<EmployeeTasksPage />} />
            <Route path="leaves" element={<EmployeeLeavesPage />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
