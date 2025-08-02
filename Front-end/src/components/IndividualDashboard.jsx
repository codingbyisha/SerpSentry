import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndividualById } from '../services/IndividualService';
import { getProjectsByUserId } from '../services/ProjectService';
import { getToken } from '../services/UserService';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const IndividualDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = () => {
    try {
      const localUser = JSON.parse(localStorage.getItem('user_data') || '{}');
      const userId = localUser?.id || localUser?.userId || localUser?.user_id;
      const email = localUser?.email || localUser?.username || localUser?.sub;
      return { localUser, userId, email };
    } catch (err) {
      console.error('Error parsing user data from localStorage:', err);
      return { localUser: {}, userId: null, email: null };
    }
  };

  const { localUser, userId: storedUserId, email } = getUserData();
  const [actualUserId, setActualUserId] = useState(storedUserId);

  const getUserByEmail = async (email) => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:9090/individuals/email', {
        params: { email },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user by email:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let userId = storedUserId;
        let userDetails = null;

        if (userId) {
          userDetails = await getIndividualById(userId);
        } else if (email) {
          userDetails = await getUserByEmail(email);
          userId = userDetails?.id || userDetails?.userId || userDetails?.user_id;
          if (userId) setActualUserId(userId);
        }

        if (!userId) throw new Error('Could not determine user ID');
        if (!userDetails) throw new Error('Could not fetch user details');

        setUser(userDetails);

        const projectList = await getProjectsByUserId(userId);
        setProjects(Array.isArray(projectList) ? projectList : []);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(err.message || 'Failed to load data. Please check API or login again.');
      } finally {
        setLoading(false);
      }
    }

    if (storedUserId || email) fetchData();
    else {
      setError('No user information found in localStorage. Please login again.');
      setLoading(false);
    }
  }, [storedUserId, email]);

  const handleAddProject = () => navigate('/add');
  const handleViewProject = (projectId) => navigate(`/project/${projectId}`);

  const chartData = [{ name: 'Projects', count: projects.length }];

  return (
    <div className="individual-dashboard-bg">
      <style>{`
        .individual-dashboard-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 0;
        }
        .dashboard-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 1.5rem;
        }
        .dashboard-message {
          font-size: 1.2rem;
          color: #444;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 2rem 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }
        .project-list {
          width: 100%;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
        }
        .project-list h3 {
          color: #6366f1;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        .project-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          background: #f9fafb;
          transition: all 0.2s ease;
        }
        .project-item:hover {
          background: #f3f4f6;
          border-color: #6366f1;
          transform: translateY(-1px);
        }
        .project-info {
          flex: 1;
        }
        .project-name {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .project-description {
          font-size: 0.9rem;
          color: #6b7280;
        }
        .project-meta {
          font-size: 0.85rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }
        .project-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-view {
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .btn-view:hover {
          background: #4f46e5;
        }
        .chart-container {
          width: 100%;
          max-width: 400px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 1.5rem 2rem;
        }
        .insights-btn {
          background: linear-gradient(90deg, #6366f1 60%, #8b5cf6 100%);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
        }
        .insights-btn:hover {
          background: linear-gradient(90deg, #8b5cf6 60%, #6366f1 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .no-projects {
          text-align: center;
          color: #6b7280;
          font-style: italic;
          padding: 2rem;
        }
        .error-message {
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 1rem;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-title">Individual Dashboard</div>

        <div style={{ width: '100%', textAlign: 'right', marginBottom: '1rem' }}>
          <button className="insights-btn" onClick={handleAddProject}>
            + Add Project
          </button>
        </div>

        {loading && <div className="dashboard-message">Loading...</div>}

        {error && (
          <div className="dashboard-message error-message">
            {error}
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <strong>Debug Info:</strong> User ID: {actualUserId || 'Not found'}, Email: {email || 'Not found'}
            </div>
          </div>
        )}

        <div className="project-list">
          <h3>Your Projects ({projects.length})</h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-info">
                  <div className="project-name">
                    {project.name || `Project #${project.id}`}
                  </div>
                  <div className="project-meta">
                    {project.creationDate && (
                      <> • Added: {new Date(project.creationDate).toLocaleDateString()}</>
                    )}
                    <br />
                    {project.domainUrl && (
                      <span>
                        Domain:{' '}
                        <a
                          href={project.domainUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#4f46e5' }}
                        >
                          {project.domainUrl}
                        </a>
                      </span>
                    )}
                    {project.userName && (
                      <><br />User: {project.userName}</>
                    )}
                  </div>
                </div>
                <div className="project-actions">
                  <button
                    className="btn-view"
                    onClick={() => handleViewProject(project.id)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-projects">
              No projects found. Click "Add Project" to create your first project!
            </div>
          )}
        </div>

        {!loading && !error && (
          <div className="chart-container">
            <h3 style={{ color: '#6366f1', marginBottom: '1rem' }}>
              Project Statistics
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualDashboard;
