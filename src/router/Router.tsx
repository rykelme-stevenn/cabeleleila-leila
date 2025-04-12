import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRouter';
import Login from '../Screens/Login/Login';
import Home from '../Screens/Home/Home';

function AppRouter() {

    return (

        <Router>
            <Routes>
                <Route element={<AuthRoute requireAuth={false} />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<AuthRoute requireAuth={true} />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;