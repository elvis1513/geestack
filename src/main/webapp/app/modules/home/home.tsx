import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the GeeStack public website
    navigate('/cn', { replace: true });
  }, [navigate]);

  return null; // Show nothing while redirecting
};

export default Home;
