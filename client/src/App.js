import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import Studentlayout from './layouts/student';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        
        {/* Private Routes */}
        <Route
          path="admin/*"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </PrivateRoute>
          }
        />

        <Route
          path="student/*"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <Studentlayout theme={currentTheme} setTheme={setCurrentTheme} />
            </PrivateRoute>
          }
        />
        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
