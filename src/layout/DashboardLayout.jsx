import { useState, useEffect } from "react";
import { List } from "react-bootstrap-icons";

import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard/Dashboard";

function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            <Sidebar collapsed={collapsed} />

            <div className="flex-grow-1 d-flex flex-column">
                {/* Topbar */}
                <div
                    className="d-flex align-items-center gap-3 px-4 border-bottom bg-white"
                    style={{
                        height: "64px",
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                    }}
                >
                    <List
                        size={22}
                        style={{ cursor: "pointer" }}
                        onClick={() => setCollapsed(!collapsed)}
                    />

                    <h5 className="m-0 fw-semibold">File Manager</h5>
                </div>

                {/* Content */}
                <div
                    className="flex-grow-1"
                    style={{
                        overflowY: "auto",
                        padding: "24px",
                        background: "#f8fafc",
                    }}
                >
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;