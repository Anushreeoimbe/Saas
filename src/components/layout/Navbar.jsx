import { motion } from "framer-motion";
import { Bell, Search, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-title">
          <h1>SaaS Management</h1>
          <p>Manage your SaaS business efficiently</p>
        </div>
      </div>

      <div className="navbar-right">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="nav-icon-button"
        >
          <Search size={18} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="nav-icon-button"
        >
          <Bell size={18} />
        </motion.button>

        <div className="navbar-divider" />

        <button className="profile-button">
          <div className="profile-avatar">AO</div>

          <div className="profile-info">
            <strong>Anushree Oimbe</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={15} color="#8d95a6" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;