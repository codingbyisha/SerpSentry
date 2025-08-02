import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { UserRegistration } from './components/UserRegistration';

import { UserLogin } from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import AboutUs from './components/AboutUs';
import { Users } from './components/Users';
import Landing from './components/Landing';
import SearchResults from './components/SearchResults';
import { getToken, getUserData } from './services/UserService';
import Layout from './components/Layout';
import ContactUs from './components/ContactUs';
import FreePageCard from './components/FreePageCard';
import ViewAllUsers from './components/ViewAllUsers';
import Add from './components/Add';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function PrivateRoute({ children, adminOnly = false }) {
    const token = getToken();
    const userData = getUserData();
    const isAdmin = userData?.role === 'ROLE_ADMIN';

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/home" />;
    }

    return children;
}

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<UserRegistration />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/free-page-card" element={<FreePageCard />} />
                <Route path="/" element={<Landing />} />

                {/* Routes with Navbar/Layout */}
                <Route element={<Layout />}>
                    {/* Admin Route */}
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/viewallusers"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <ViewAllUsers />
                            </PrivateRoute>
                        }
                    />
                    {/* Protected Routes */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/individual-dashboard"
                        element={
                            <PrivateRoute>
                                <IndividualDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/about" element={<AboutUs />} />
                </Route>
                
                {/* Add route outside Layout to avoid redirect issues */}
                <Route
                    path="/add"
                    element={
                        <PrivateRoute>
                            <Add />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
