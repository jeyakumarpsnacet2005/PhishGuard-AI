import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import EmailChecker from './pages/EmailChecker';
import UrlChecker from './pages/UrlChecker';
import MessageChecker from './pages/MessageChecker';
import Reports from './pages/Reports';
import Login from './pages/Login';
import { AuthContext, User } from './contexts/AuthContext';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const authContextValue = useMemo(() => ({
    user,
    login: (email: string) => setUser({ email, name: email.split('@')[0] }),
    logout: () => setUser(null),
  }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} />
            <Route path="email" element={<EmailChecker />} />
            <Route path="url" element={<UrlChecker />} />
            <Route path="message" element={<MessageChecker />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;