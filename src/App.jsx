import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { List } from "react-bootstrap-icons";

import Sidebar from "./layout/Sidebar";
import FacebookDashboard from "./pages/FacebookDashboard/FacebookDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTitle = () => {
    switch (location.pathname) {
      case "/facebook":
        return "Facebook Dashboard";
      default:
        return "Dashboard";
    }
  };

  const renderContent = () => {
    switch (location.pathname) {
      case "/facebook":
        return <FacebookDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>

      <Sidebar collapsed={collapsed} />

      <div className="flex-grow-1 d-flex flex-column">

        <div className="topbar d-flex align-items-center gap-3 px-3">
          <List
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => setCollapsed(!collapsed)}
          />
          <h6 className="m-0">{getTitle()}</h6>
        </div>

        <div className="flex-grow-1" style={{ overflowY: "auto", padding: 16 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;