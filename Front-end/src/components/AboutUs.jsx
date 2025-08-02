import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Isha from '../images/Isha.jpg';
import Kajal from '../images/Kajal.jpg';
import Ravi from '../images/Ravi.jpeg';

// If the image is missing, we can use a placeholder
const defaultImage = 'https://via.placeholder.com/200x200?text=Profile+Image';

const AboutUs = () => {
    const developers = [
        {
            name: "Isha Srivastava",
            role: "Full Stack Developer",
            image: Isha,
            bio: "Passionate about creating intuitive and efficient web applications. Specializes in React and Spring Boot development.",
            github: "https://github.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe",
            email: "john@example.com"
        },
        {
            name: "Kajal Palwe",
            role: "Backend Developer",
            image: Kajal,
            bio: "Creative designer with a keen eye for user experience. Loves turning complex problems into simple, beautiful solutions.",
            github: "https://github.com/janesmith",
            linkedin: "https://linkedin.com/in/janesmith",
            email: "jane@example.com"
        },
        {
            name: "Ravi Yadav",
            role: "Frontend Developer",
            image: Ravi || defaultImage,
            bio: "Database expert and system architect. Passionate about building scalable and secure backend solutions.",
            github: "https://github.com/mikejohnson",
            linkedin: "https://linkedin.com/in/mikejohnson",
            email: "mike@example.com"
        }
    ];

    return (
        <div className="about-page">
            <style>
                {`
                    .about-page {
                        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                        min-height: 100vh;
                        padding-bottom: 3rem;
                    }
                    .team-image {
                        width: 200px;
                        height: 200px;
                        border-radius: 50%;
                        margin: 0 auto 2rem;
                        object-fit: cover;
                        border: 5px solid white;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                        position: relative;
                    }
                    .team-image::after {
                        content: '';
                        position: absolute;
                        top: -15px;
                        left: -15px;
                        right: -15px;
                        bottom: -15px;
                        border-radius: 50%;
                        box-shadow: 
                            0 0 25px rgba(99, 102, 241, 0.2),
                            inset 0 0 25px rgba(255,255,255,0.3);
                        z-index: -1;
                    }
                    .team-image:hover {
                        transform: scale(1.02);
                        box-shadow: 
                            0 20px 40px rgba(99, 102, 241, 0.4),
                            0 8px 20px rgba(99, 102, 241, 0.3),
                            inset 0 0 20px rgba(0,0,0,0.2);
                    }
                    .social-links {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-top: 20px;
                    }
                    .social-links a {
                        color: #6366f1;
                        font-size: 1.5rem;
                        transition: all 0.3s ease;
                    }
                    .social-links a:hover {
                        color: #8b5cf6;
                        transform: translateY(-3px);
                    }
                    .hero-section {
                        background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
                        color: white;
                        border-radius: 30px;
                        padding: 4rem 2rem;
                        margin: 2rem 0;
                        box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
                        position: relative;
                        overflow: hidden;
                    }
                    .hero-section::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        right: -50%;
                        width: 100%;
                        height: 100%;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
                        transform: rotate(45deg);
                    }
                    .quick-action-btn {
                        border-radius: 15px;
                        padding: 1rem 2rem;
                        font-weight: 500;
                        border: none;
                        background: linear-gradient(45deg, #6366f1, #8b5cf6);
                        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
                        transition: all 0.3s ease;
                    }
                    .quick-action-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
                    }
                `}
            </style>

            <Container>
                <div className="hero-section text-center">
                    <h1 className="display-4 fw-bold mb-4">Meet Our Team</h1>
                    <p className="lead">
                        We're a passionate team dedicated to helping you stay connected with your loved ones
                        through timely reminders and thoughtful celebrations.
                    </p>
                </div>

                <Row className="g-4">
                    {developers.map((developer, index) => (
                        <Col lg={4} key={index}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <img 
                                        src={developer.image} 
                                        alt={developer.name} 
                                        className="team-image"
                                    />
                                    <Card.Title className="h3 mb-3">{developer.name}</Card.Title>
                                    <div className="text-primary mb-3">{developer.role}</div>
                                    <Card.Text className="text-muted mb-4">
                                        {developer.bio}
                                    </Card.Text>
                                    <div className="social-links">
                                        <a href={developer.github} target="_blank" rel="noopener noreferrer">
                                            <FaGithub />
                                        </a>
                                        <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin />
                                        </a>
                                        <a href={`mailto:${developer.email}`}>
                                            <FaEnvelope />
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="text-center py-5">
                    <h2 className="mb-4 fw-bold">Want to Learn More?</h2>
                    <p className="lead mb-4 text-muted">
                        Feel free to reach out to any of our team members or visit our GitHub repository
                        to learn more about the project and how you can contribute.
                    </p>
                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="quick-action-btn"
                        as="a" 
                        href="https://github.com/your-repo"
                        target="_blank"
                    >
                        View Project Repository
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default AboutUs; 