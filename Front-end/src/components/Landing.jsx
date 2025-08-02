import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { toast } from 'react-toastify';
import { checkRankings } from '../services/LandingService';

const features = [
  {
    title: 'Relevant Keywords Only',
    desc: 'Stop going through long keyword lists. Save time and get a list of just the keywords you need. 46 languages and more than 230 geo targets are supported. SERP Sentry Pro is a smart SEO keyword rank tracking and optimization tool designed to help businesses and individuals monitor their search engine performance in real-time. This platform enables users to track the rankings of their targeted keywords across multiple search engines, devices, and locations using data from reliable sources like SerpAPI and Google Trends. The application features a user-friendly dashboard for project and keyword management, along with insightful SEO analysis reports and competitor comparisons. It includes modules for rank history visualization, automated PDF reporting, and alert notifications for rank drops or gains. Admins can manage users and oversee all SEO projects, while individual users can handle their own project portfolios.',
    svg: (
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="40" width="80" height="60" rx="8" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <rect x="50" y="70" width="15" height="20" rx="2" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="70" y="60" width="15" height="30" rx="2" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="90" y="50" width="15" height="40" rx="2" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="120" y="60" width="25" height="35" rx="4" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <rect x="130" y="80" width="10" height="15" rx="2" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="140" y="70" width="5" height="25" rx="1.5" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="110" y="100" width="30" height="5" rx="2.5" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: 'Automatic Keyword Grouping',
    desc: 'Discover new ideas and concepts through popular topics and user intent. Our tool groups keywords automatically for better content planning.',
    svg: (
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="80" r="30" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <circle cx="120" cy="60" r="20" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <rect x="100" y="90" width="40" height="20" rx="6" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="40" y="40" width="20" height="10" rx="3" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: 'Real-Time SERP Tracking',
    desc: 'Monitor your keyword rankings in real time and get instant updates on your website’s performance across multiple search engines.',
    svg: (
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="60" width="100" height="50" rx="10" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <polyline points="50,100 80,80 110,90 130,70" fill="none" stroke="#6366f1" strokeWidth="3"/>
        <circle cx="50" cy="100" r="4" fill="#6366f1"/>
        <circle cx="80" cy="80" r="4" fill="#6366f1"/>
        <circle cx="110" cy="90" r="4" fill="#6366f1"/>
        <circle cx="130" cy="70" r="4" fill="#6366f1"/>
      </svg>
    )
  },
  {
    title: 'Comprehensive Analytics',
    desc: 'Gain deep insights into your SEO strategy with detailed analytics and reporting. Track progress, identify trends, and optimize for better results.',
    svg: (
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="50" width="120" height="60" rx="12" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <rect x="50" y="90" width="15" height="15" rx="3" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="75" y="80" width="15" height="25" rx="3" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="100" y="70" width="15" height="35" rx="3" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="125" y="60" width="15" height="45" rx="3" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: 'Multi-Language & Geo Support',
    desc: 'Expand your reach with support for 46 languages and 230+ geo targets. Tailor your keyword research to any audience, anywhere.',
    svg: (
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="90" cy="80" rx="60" ry="35" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <ellipse cx="90" cy="80" rx="40" ry="20" fill="#6366f1" fillOpacity="0.08" stroke="#6366f1" strokeWidth="2"/>
        <ellipse cx="90" cy="80" rx="20" ry="10" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="80" y="60" width="20" height="10" rx="2" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: 'User-Friendly Interface',
    desc: 'Enjoy a seamless experience with our intuitive and easy-to-use platform. Designed for both beginners and SEO professionals.',
    svg: (
      <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="60" width="100" height="50" rx="12" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
        <circle cx="70" cy="85" r="10" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="100" y="80" width="30" height="10" rx="5" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
        <rect x="110" y="100" width="20" height="5" rx="2.5" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2"/>
      </svg>
    )
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const handleSearchClick = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }
    try {
      const data = await checkRankings(url);
      // Navigate to FreePageCard page with data
      navigate('/free-page-card', { state: { results: data, url: url } });
    } catch (error) {
      console.error('Error checking rankings:', error);
      toast.error('Error checking rankings. Please try again.');
    }
  };

  return (
    <div className="landing-page-bg">
      <Navbar />
      <style>{`
        .landing-page-bg {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
          padding: 0;
        }
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
        .landing-hero {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          overflow: visible;
          background: url('/SEO.jpg') center/cover no-repeat;
          background-blend-mode: lighten;
        }
        .landing-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4); /* dark overlay to reduce image opacity */
          z-index: 1;
          pointer-events: none;
        }
        .hero-card {
          /* background: rgba(255, 255, 255, 0.74);more transparent */
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.10);
          padding: 3rem 2.5rem 2.5rem 2.5rem;
          max-width: 700px;
          width: 100%;
          margin-top: 2.5rem;
          position: relative;
          z-index: 2;
        }
        .hero-title {
          color:rgba(253, 253, 253, 0.98);
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 0.7rem;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .hero-subtitle {
          color:rgba(253, 253, 253, 0.98);
          font-size: 1.25rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .hero-searchbar {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 16px rgba(99,102,241,0.07);
          padding: 0.5rem 1rem;
          gap: 0.5rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-input {
          border: none;
          outline: none;
          font-size: 1.1rem;
          padding: 0.7rem 1rem;
          border-radius: 4px;
          flex: 1 1 250px;
          background: rgba(255,255,255,0.7);
        }
        .search-btn {
          background: linear-gradient(45deg, #6366f1cc, #8b5cf6cc); /* add alpha for transparency */
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 0.6rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .search-btn:hover {
          background: #178a4c !important;
          color: #fff;
        }
        button:hover, .btn:hover {
          background: #178a4c !important;
          color: #fff !important;
        }
        /* Feature section styles */
        .feature-section {
          background: white;
          color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 0 80px 0;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.07);
          margin: 0;
        }
        .feature-section.reverse {
          flex-direction: row-reverse;
        }
        .feature-content {
          flex: 0 0 70%;
          max-width: none;
          padding-left: 20px;
        }
        .feature-content h2 {
          font-size: 2.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #6366f1;
        }
        .feature-content p {
          color: #444;
          font-size: 1.1rem;
          margin-bottom: 0;
        }
        .feature-illustration {
          flex: 0 0 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 320px;
          padding-right: 5vw;
        }
        .feature-divider {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 0 5vw 0 5vw;
        }
        @media (max-width: 900px) {
          .landing-navbar { padding: 0 1rem; }
          .navbar-left, .navbar-right { gap: 1rem; }
          .hero-title { font-size: 3rem; }
          .hero-searchbar { flex-direction: column; gap: 0.7rem; }
          .feature-section {
            flex-direction: column;
            padding: 40px 0 32px 0;
          }
          .feature-content, .feature-illustration {
            padding: 0 2vw;
            max-width: 100%;
          }
          .feature-illustration {
            margin-top: 2rem;
            padding-right: 0;
          }
        }
        @media (max-width: 600px) {
          .landing-navbar { flex-direction: column; height: auto; padding: 0.5rem; }
          .navbar-left, .navbar-right { flex-direction: column; gap: 0.5rem; }
          .hero-content { margin-top: 2rem; }
          .hero-title { font-size: 1.3rem; }
          .hero-subtitle { font-size: 1rem; }
          .hero-searchbar { max-width: 100%; }
        }
        
        /* Footer Styles */
        .landing-footer {
          background: #1f2937;
          color: #f9fafb;
          padding: 3rem 0 2rem 0;
          margin-top: 2rem;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          padding: 0 2rem;
          gap: 3rem;
        }
        .footer-column {
          flex: 1;
        }
        .footer-column h3 {
          color: #f9fafb;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border-bottom: 2px solid #6366f1;
          padding-bottom: 0.5rem;
        }
        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-column ul li {
          margin-bottom: 0.5rem;
        }
        .footer-column ul li a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .footer-column ul li a:hover {
          color: #6366f1;
        }
        .social-icons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .social-icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: #374151;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1.2rem;
          transition: background 0.2s;
        }
        .social-icon:hover {
          background: #6366f1;
        }
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 2rem;
          }
          .footer-column {
            text-align: center;
          }
          .social-icons {
            justify-content: center;
          }
        }
      `}</style>
      <section className="landing-hero">
        <div className="hero-card">
          <h1 className="hero-title">Just The Best Keywords</h1>
          <p className="hero-subtitle">Discover more relevant keywords for your content</p>
          <div className="hero-searchbar">
            <input 
              className="search-input" 
              type="text" 
              placeholder="Enter url..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearchClick}>Search Rank</button>
          </div>
        </div>
      </section>
      {/* Feature Sections */}
      {features.map((feature, idx) => (
        <React.Fragment key={feature.title}>
          <section className={`feature-section${idx % 2 === 1 ? ' reverse' : ''}`}>
            <div className="feature-content">
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
            </div>
            <div className="feature-illustration">
              {feature.svg}
            </div>
          </section>
          <hr className="feature-divider" />
        </React.Fragment>
      ))}
      
      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Write For Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <div className="social-icons">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🔍</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">💼</a>
            </div>
            <h3>Demo</h3>
            <ul>
              <li><a href="#">Keyword Research Tool</a></li>
              <li><a href="#">Trending Tool</a></li>
              <li><a href="#">Top Searches Tool</a></li>
              <li><a href="#">LSI Graph Tool</a></li>
              <li><a href="#">Personality Test</a></li>
              <li><a href="#">Vocabulary Test</a></li>
              <li><a href="#">Category Recommendation API</a></li>
              <li><a href="#">Emotion Analysis API</a></li>
              <li><a href="#">Keyword Suggestion API</a></li>
              <li><a href="#">Language Scoring API</a></li>
              <li><a href="#">Sentiment Analysis API</a></li>
              <li><a href="#">Text Similarity API</a></li>
              <li><a href="#">Topic Tagging API</a></li>
              <li><a href="#">Word Associations API</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 