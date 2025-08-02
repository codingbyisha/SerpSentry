import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { removeToken, getUserData } from '../services/UserService';

export function Navbar() {
    const navigate = useNavigate();
    const userData = getUserData();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <>
            <style>{`
                .landing-navbar {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 2.5rem;
                  height: 60px;
                  background: white;
                  color: #6366f1;
                  font-size: 1rem;
                  box-shadow: 0 2px 12px rgba(99, 102, 241, 0.04);
                }
                .navbar-left, .navbar-right {
                  display: flex;
                  align-items: center;
                  gap: 1.5rem;
                }
                .logo {
                  font-weight: bold;
                  font-size: 1.3rem;
                  margin-right: 2rem;
                  letter-spacing: 0.5px;
                  color: #6366f1;
                }
                .logo-ideas {
                  color: #8b5cf6;
                  font-weight: 500;
                }
                .nav-link {
                  color: #6366f1;
                  text-decoration: none;
                  opacity: 0.85;
                  transition: color 0.2s, opacity 0.2s, font-weight 0.2s, font-size 0.2s;
                }
                .nav-link:hover {
                  color: #178a4c !important;
                  opacity: 1;
                  font-weight: bold;
                  font-size: 1.1rem;
                }
                .nav-link-signup {
                  border: 1.5px solid #8b5cf6;
                  border-radius: 4px;
                  padding: 0.25rem 0.9rem;
                  margin-left: 0.5rem;
                  color: #8b5cf6;
                  background: transparent;
                  font-weight: 500;
                }
                .nav-link-signup:hover {
                  border-color: #178a4c;
                  color: #178a4c !important;
                }
                @media (max-width: 900px) {
                  .landing-navbar { padding: 0 1rem; }
                  .navbar-left, .navbar-right { gap: 1rem; }
                }
                @media (max-width: 600px) {
                  .landing-navbar { flex-direction: column; height: auto; padding: 0.5rem; }
                  .navbar-left, .navbar-right { flex-direction: column; gap: 0.5rem; }
                }
            `}</style>
            <nav className="landing-navbar">
                <div className="navbar-left">
                    <span className="logo">SERP<span className="logo-ideas">SENTRY</span></span>
                    {userData && userData.role === 'ROLE_ADMIN' ? (
                        <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
                    ) : (
                        <Link to="/" className="nav-link">Home</Link>
                    )}
                    {!(userData && userData.role === 'ROLE_ADMIN') && (
                        <>
                            <Link to="/about" className="nav-link">About Us</Link>
                            <Link to="/contact" className="nav-link">Contact Us</Link>
                        </>
                    )}
                </div>
                <div className="navbar-right">
                    {userData && userData.role === 'ROLE_ADMIN' ? null : (
                        <>
                            <Link to="/login" className="nav-link">Log In</Link>
                            <Link to="/register" className="nav-link nav-link-signup">Sign Up</Link>
                        </>
                    )}
                    {userData && (
                        <button onClick={handleLogout} className="nav-link nav-link-signup" style={{marginLeft: '0.5rem', background: '#fff', border: '1.5px solid #8b5cf6', color: '#8b5cf6', borderRadius: '4px', fontWeight: 500, cursor: 'pointer'}}>Logout</button>
                    )}
                </div>
            </nav>
        </>
    );
} 