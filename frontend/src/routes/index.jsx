import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recommendations from '../pages/Recommendations';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Flights from '../pages/Flights';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/flights" element={<Flights />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
