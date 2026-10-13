import { motion } from "framer-motion";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  UserRound,
  Package,
  Activity,
  FileBarChart,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainMenu = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: UserRound,
  },
  {
    label: "Subscriptions",
    path: "/subscriptions",
    icon: CreditCard,
  },
  {
    label: "Plans",
    path: "/plans",
    icon: Package,
  },
];

const analyticsMenu = [
  {
    label: "Usage",
    path: "/usage",
    icon: Activity,
  },
  {
    label: "Revenue",
    path: "/revenue",
    icon: DollarSign,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <BarChart3 size={22} />
        </div>

        <div>
          <h2>SaaSly</h2>
          <span>Management</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">MAIN MENU</p>

        <nav className="sidebar-nav">
          {mainMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="sidebar-link-content"
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>

                    {isActive && <div className="active-indicator" />}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">ANALYTICS</p>

        <nav className="sidebar-nav">
          {analyticsMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="sidebar-link-content"
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>

                    {isActive && <div className="active-indicator" />}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <div className="sidebar-link-content">
            <Settings size={19} />
            <span>Settings</span>
          </div>
        </NavLink>

        <button className="sidebar-logout">
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>

      <button className="mobile-close">
        <X size={20} />
      </button>
    </aside>
  );
}

export default Sidebar;