import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recommendations from '../pages/Recommendations';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Flights from '../pages/Flights';
import Loading from '../components/Loading';

// Create a wrapper component to handle loading state
const LoadingWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Show loader for at least 800ms to avoid flashing

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {isLoading && <Loading />}
            {children}
        </>
    );
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <LoadingWrapper>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/flights" element={<Flights />} />
                </Routes>
            </LoadingWrapper>
        </BrowserRouter>
    )
}

export default AppRoutes;
