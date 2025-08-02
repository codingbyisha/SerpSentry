import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/ProjectService';
import { getUserByEmail } from '../services/IndividualService';
import { toast } from 'react-toastify';

const Add = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    domainUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  // Function to verify token is valid
  const isTokenValid = (token) => {
    if (!token) return false;
    const tokenData = parseJwt(token);
    if (!tokenData) return false;
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (tokenData.exp && tokenData.exp < currentTime) {
      return false;
    }
    
    return true;
  };

  // Function to debug user data structure
  const debugUserData = () => {
    console.log('=== DEBUG USER DATA ===');
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('auth_token exists:', !!localStorage.getItem('auth_token'));
    console.log('user_data exists:', !!localStorage.getItem('user_data'));
    
    const rawUserData = localStorage.getItem('user_data');
    console.log('Raw user_data:', rawUserData);
    
    if (rawUserData) {
      try {
        const parsed = JSON.parse(rawUserData);
        console.log('Parsed user_data:', parsed);
        console.log('User data keys:', Object.keys(parsed));
        console.log('Possible userId fields:');
        console.log('  - id:', parsed.id);
        console.log('  - userId:', parsed.userId);
        console.log('  - user_id:', parsed.user_id);
        console.log('  - sub:', parsed.sub);
        console.log('Possible email fields:');
        console.log('  - email:', parsed.email);
        console.log('  - userEmail:', parsed.userEmail);
        console.log('Possible userName fields:');
        console.log('  - name:', parsed.name);
        console.log('  - userName:', parsed.userName);
        console.log('  - username:', parsed.username);
        console.log('  - user_name:', parsed.user_name);
      } catch (e) {
        console.log('Error parsing user_data:', e);
      }
    }
    
    if (token) {
      const tokenData = parseJwt(token);
      console.log('Token data:', tokenData);
      console.log('Token keys:', Object.keys(tokenData || {}));
    }
    
    // Test API endpoint
    console.log('=== TESTING API ENDPOINT ===');
    const testEmail = userData.email || 'test@example.com';
    console.log('Testing endpoint with email:', testEmail);
    console.log('Full URL:', `http://localhost:9090/individuals/email?email=${encodeURIComponent(testEmail)}`);
    console.log('========================');
  };

  // Get user data from localStorage using the correct keys
  const token = localStorage.getItem('auth_token');
  const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
  
  // Try multiple possible field names for user data
  const userId = userData.id || userData.userId || userData.user_id || userData.sub;
  const userName = userData.name || userData.userName || userData.username || userData.user_name;
  const userEmail = userData.email || userData.userEmail;
  
  // Function to fetch user details from backend
  const fetchUserDetails = React.useCallback(async (email) => {
    try {
      setUserLoading(true);
      console.log('Fetching user details for email:', email);
      const user = await getUserByEmail(email);
      console.log('User details from backend:', user);
      setUserDetails(user);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      
      // Try to use localStorage data as fallback
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      if (userData.id && userData.name) {
        console.log('Using localStorage data as fallback');
        setUserDetails({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role
        });
      } else {
        toast.error('Failed to load user details');
        navigate('/login');
      }
    } finally {
      setUserLoading(false);
    }
  }, [navigate]);

  // Debug user data only once when component mounts
  useEffect(() => {
    console.log('=== Add Component User Info ===');
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('Raw user_data from localStorage:', localStorage.getItem('user_data'));
    console.log('Parsed UserData:', userData);
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('Extracted UserId:', userId);
    console.log('Extracted UserName:', userName);
    console.log('Extracted UserEmail:', userEmail);
    console.log('================================');
  }, []); // Empty dependency array - runs only once

  useEffect(() => {
    // Prevent multiple API calls
    if (hasFetchedUser) {
      return;
    }
    
    // Verify user is authenticated
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }
    
    if (!isTokenValid(token)) {
      console.log('Token is invalid or expired, redirecting to login');
      navigate('/login');
      return;
    }
    
    // Get email from user data or token
    let userEmail = userData.email;
    if (!userEmail) {
      console.log('No email found in user data, trying to extract from token');
      const tokenData = parseJwt(token);
      console.log('Token data:', tokenData);
      if (tokenData && tokenData.email) {
        userEmail = tokenData.email;
        console.log('Found email in token:', userEmail);
      }
    }
    
    if (userEmail) {
      // Fetch user details from backend using email
      setHasFetchedUser(true);
      fetchUserDetails(userEmail);
    } else {
      console.log('No email found, redirecting to login');
      navigate('/login');
    }
  }, [token, navigate, hasFetchedUser, fetchUserDetails]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.domainUrl.trim()) {
      newErrors.domainUrl = 'Domain URL is required';
    } else if (!isValidUrl(formData.domainUrl)) {
      newErrors.domainUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (!userDetails) {
        toast.error('User details not loaded');
        return;
      }
      
      const projectData = {
        name: formData.name.trim(),
        domainUrl: formData.domainUrl.trim(),
        userId: Number(userDetails.id),
        userName: userDetails.name || userDetails.userName || userDetails.username || 'Unknown User'
      };

      console.log('Project data being submitted:', projectData);
      await createProject(projectData);
      toast.success('Project created successfully!');
      navigate('/individual-dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/individual-dashboard');
  };

  return (
    <div className="add-project-page">
      <style>{`
        .add-project-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2rem 1rem;
        }
        .add-project-container {
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
        }
        .add-project-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .add-project-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 0.5rem;
        }
        .add-project-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .form-input.error {
          border-color: #ef4444;
        }
        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
        }
        .btn-primary {
          background: #6366f1;
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background: #5855eb;
          transform: translateY(-1px);
        }
        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }
        .btn-secondary:hover:not(:disabled) {
          background: #e5e7eb;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .user-info {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        .user-info h4 {
          color: #6366f1;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .user-info p {
          margin: 0.25rem 0;
          color: #6b7280;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="add-project-container">
        <div className="add-project-header">
          <h1 className="add-project-title">Add New Project</h1>
          <p className="add-project-subtitle">Create a new project to track your SEO performance</p>
        </div>

        <div className="user-info">
          <h4>Current User Information</h4>
          {userLoading ? (
            <p>Loading user details...</p>
          ) : userDetails ? (
            <>
              <p><strong>User ID:</strong> {userDetails.id}</p>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Role:</strong> {userDetails.role}</p>
            </>
          ) : (
            <p>Failed to load user details</p>
          )}
          <button 
            type="button" 
            onClick={debugUserData}
            style={{
              background: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              marginTop: '0.5rem'
            }}
          >
            Debug User Data (Check Console)
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter project name"
              disabled={loading || userLoading}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="domainUrl" className="form-label">
              Domain URL *
            </label>
            <input
              type="url"
              id="domainUrl"
              name="domainUrl"
              value={formData.domainUrl}
              onChange={handleInputChange}
              className={`form-input ${errors.domainUrl ? 'error' : ''}`}
              placeholder="https://example.com"
              disabled={loading || userLoading}
            />
            {errors.domainUrl && <div className="error-message">{errors.domainUrl}</div>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading || userLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || userLoading || !userDetails}
            >
              {loading ? 'Creating Project...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add; 