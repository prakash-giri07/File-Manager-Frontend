import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/DashboardLayout";

import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

    </Routes>
  );
}

export default App;