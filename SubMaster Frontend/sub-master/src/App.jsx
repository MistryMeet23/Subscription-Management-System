import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Contact from './pages/ContactPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import EditProfilePage from './pages/EditProfilePage';
import CreateBusiness from './pages/CreateBusiness';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ErrorPage from './pages/ErrorPage';
import AllSubscriptionsPage from './pages/AllSubscriptionsPage';
import MyBusinessPage from './pages/MyBusinessPage';
import ManageBusiness from './pages/ManageBusiness';
import Logout from './pages/Logout';
import AddNewPlans from './pages/AddNewPlans';
import EditBusinessPlan from './pages/EditBusinessPlan';
import ProtectedRoute from './pages/ProtectedRoute';
import AllUsers from './pages/AllUsers';
import ExplorePlan from './pages/ExplorePlan';

const { Content } = Layout;

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Paths where Navbar and Footer should not appear
  const shouldShowNavbarAndFooter = !['/login', '/register', '/forgot-password', '/AdminDashboard'].includes(location.pathname);

  useEffect(() => {
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    const sessionKey = 'sessionStartTime';

    // Set the session start time when the app loads
    localStorage.setItem(sessionKey, Date.now());

    const checkSessionTimeout = () => {
      const sessionStartTime = localStorage.getItem(sessionKey);
      if (sessionStartTime && Date.now() - sessionStartTime >= sessionTimeout) {
        localStorage.clear(); // Clear session data
        navigate('/login'); // Redirect to login page
      }
    };

    // Check session timeout every second
    const interval = setInterval(checkSessionTimeout, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate]);

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
          <Route path="/createbusiness" element={<CreateBusiness />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/AllSubscriptions" element={<AllSubscriptionsPage />} />
          <Route path="/MyBusinessPage" element={<MyBusinessPage />} />
          <Route path="/ManageBusiness" element={<ManageBusiness />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/AddNewPlans" element={<AddNewPlans />} />
          <Route path="/EditBusinessPlan" element={<EditBusinessPlan />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/ExplorePlan" element={<ExplorePlan />} />
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute allowedRoles={[1]}/>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <Profile />
              </ProtectedRoute>
            }
          />
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
