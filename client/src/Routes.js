import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Header from "./components/header/Header";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Developers from "./pages/Developers";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import ViewPost from "./pages/ViewPost";

function RoutesConfig() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<ViewPost />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default RoutesConfig;
