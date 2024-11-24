import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Contact from './pages/ContactPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import EditProfilePage from './pages/EditProfilePage';
import CreateBusiness from './pages/CreateBusiness';
import AdminDashboard from './pages/AdminDashboard';

const { Content } = Layout;

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbarAndFooter = !['/login', '/register', '/AdminDashboard'].includes(location.pathname);

  return (
    <>
      {shouldShowNavbarAndFooter && <Navbar />}
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/EditProfilePage" element={<EditProfilePage />} />
          <Route path="/create-business" element={<CreateBusiness />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Content>
      {shouldShowNavbarAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
