import { useContext, useEffect } from 'react';
import './App.css'
import { AuthContext } from './contexts/AuthProvider';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { toast } from 'react-toastify';

function App() {
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      // Show toast notification
      toast.success(location.state.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Clear location state after displaying toast
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  return (
    <div className="bg-primary-background">
      {
        loading ?
          <Loading />
          :
          <>
            <Navbar />
            <Outlet />
            <Footer />
          </>

      }
    </div>
  )
}

export default App
