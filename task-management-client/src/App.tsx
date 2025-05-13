import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

function App() {
  const [count, setCount] = useState(0);

  const Home = () => <h1>Home Page</h1>;
  const Dashboard = () => <h1>Dashboard</h1>;

  const Element = () => <h1>Login Page</h1>;

  //Mock authentication function
  const isAuthenticated = () => {
    // Replace with your actual authentication logic
    return !!localStorage.getItem("token");
  };

  const PrivateRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Element /> : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
