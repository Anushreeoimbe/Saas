import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Customers from "../pages/Customers";
import Subscriptions from "../pages/Subscriptions";
import Plans from "../pages/Plans";
import Usage from "../pages/Usage";
import Revenue from "../pages/Revenue";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Main Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Management Modules */}
      <Route path="/users" element={<Users />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/plans" element={<Plans />} />

      {/* Analytics Modules */}
      <Route path="/usage" element={<Usage />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/reports" element={<Reports />} />

      {/* Application Settings */}
      <Route path="/settings" element={<Settings />} />

      {/* 404 - Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
