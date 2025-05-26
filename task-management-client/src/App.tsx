import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const PrivateRoute = ({ allowedUserTypes }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // Check if userType is allowed for this route
    if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
      // Redirect to home if userType not allowed
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute allowedUserTypes={["user"]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute allowedUserTypes={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
