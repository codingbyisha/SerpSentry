import React from 'react';
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { login, storeToken, storeUserData } from "../services/UserService";

const UserLogin = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Full login response:', response);
            
            if (response.data) {
                console.log('Response data:', response.data);
                const { token, ...userData } = response.data;
                console.log('Token:', token);
                console.log('User data:', userData);
                console.log('User data keys:', Object.keys(userData));
                
                // Store the token and user data
                storeToken(token);
                storeUserData(userData);
                
                // Verify storage
                const storedToken = localStorage.getItem('auth_token');
                const storedUserData = localStorage.getItem('user_data');
                console.log('Stored token:', storedToken);
                console.log('Stored user data:', storedUserData);
                console.log('Parsed stored user data:', JSON.parse(storedUserData || '{}'));
                
                toast.success('Login successful!');
                // Redirect based on role
                if (userData.role === 'ROLE_ADMIN') {
                  navigate('/admin-dashboard');
                } else {
                  navigate('/individual-dashboard');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <div className="login-page">
                <style>
                    {`
                        .login-page {
                            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 2rem 0;
                        }
                        .login-card {
                            background: white;
                            border: none;
                            border-radius: 15px;
                            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
                            overflow: hidden;
                            position: relative;
                        }
                        .login-card::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 5px;
                            background: linear-gradient(45deg, #6366f1, #8b5cf6);
                        }
                        .form-control {
                            padding: 0.75rem;
                            border-radius: 8px;
                            border: 1px solid #e2e8f0;
                            transition: all 0.2s ease;
                        }
                        .form-control:focus {
                            border-color: #6366f1;
                            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                        }
                        .form-label {
                            font-weight: 500;
                            margin-bottom: 0.5rem;
                        }
                        .btn-primary {
                            background: linear-gradient(45deg, #6366f1, #8b5cf6);
                            border: none;
                            padding: 0.75rem;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        }
                        .btn-primary:hover {
                            transform: translateY(-1px);
                            box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
                        }
                        .register-link {
                            color: #6366f1;
                            text-decoration: none;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        }
                        .register-link:hover {
                            color: #8b5cf6;
                        }
                        .login-header {
                            text-align: center;
                            margin-bottom: 2rem;
                        }
                        .login-header h2 {
                            background: linear-gradient(45deg, #6366f1, #8b5cf6);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            font-weight: bold;
                        }
                    `}
                </style>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={5} xl={4}>
                            <Card className="login-card p-4">
                                <Card.Body>
                                    <div className="login-header">
                                        <h2>Welcome Back!</h2>
                                        <p className="text-muted">Sign in to continue to your account</p>
                                    </div>

                                    <Form onSubmit={handleSubmit} autoComplete="off">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                autoComplete="new-email"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                required
                                                autoComplete="new-password"
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100 mb-3">
                                            Sign In
                                        </Button>

                                        <div className="text-center">
                                            <p className="mb-0">
                                                Don't have an account? <Link to="/register" className="register-link">Register here</Link>
                                            </p>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export { UserLogin };