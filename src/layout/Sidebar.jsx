import { Nav } from "react-bootstrap";
import { House, Facebook } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const menuConfig = [
    { key: "home", label: "Home", icon: House, path: "/" },
    { key: "facebook", label: "Facebook", icon: Facebook, path: "/facebook" },
];

const Sidebar = ({ collapsed }) => {
    return (
        <div
            className="sidebar d-flex flex-column p-3"
            style={{
                width: collapsed ? "80px" : "250px",
                transition: "all 0.3s ease",
                position: "relative",
            }}
        >
            <Nav className="flex-column gap-2">
                {menuConfig.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.key}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""
                                }`
                            }
                            style={{
                                justifyContent: collapsed ? "center" : "flex-start",
                            }}
                        >
                            <Icon size={18} />
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    );
                })}
            </Nav>
        </div>
    );
};

export default Sidebar;