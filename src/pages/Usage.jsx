
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  HardDrive,
  Users,
  TrendingUp,
} from "lucide-react";

const usageData = [
  { name: "API Requests", used: 785000, limit: 1000000, unit: "requests", color: "purple" },
  { name: "Storage", used: 680, limit: 1000, unit: "GB", color: "blue" },
  { name: "Active Seats", used: 820, limit: 1200, unit: "seats", color: "green" },
  { name: "Compute Hours", used: 7200, limit: 10000, unit: "hours", color: "orange" },
];

function Usage() {
  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <span className="page-eyebrow">PRODUCT PERFORMANCE</span>
          <h1>Usage Analytics</h1>
          <p>Monitor resource consumption and usage limits across your SaaS platform.</p>
        </div>
      </div>

      <div className="module-stats-grid">
        <motion.div className="module-stat-card" whileHover={{ y: -4 }}>
          <div className="module-icon purple"><Activity /></div>
          <span>Total API Requests</span>
          <h2>785K</h2>
          <small><TrendingUp size={14} /> 12.8% vs last month</small>
        </motion.div>

        <motion.div className="module-stat-card" whileHover={{ y: -4 }}>
          <div className="module-icon blue"><HardDrive /></div>
          <span>Storage Used</span>
          <h2>680 GB</h2>
          <small>68% of total capacity</small>
        </motion.div>

        <motion.div className="module-stat-card" whileHover={{ y: -4 }}>
          <div className="module-icon green"><Users /></div>
          <span>Active Seats</span>
          <h2>820</h2>
          <small>Across all customer accounts</small>
        </motion.div>

        <motion.div className="module-stat-card" whileHover={{ y: -4 }}>
          <div className="module-icon orange"><Cpu /></div>
          <span>Compute Hours</span>
          <h2>7,200</h2>
          <small>72% of allocated capacity</small>
        </motion.div>
      </div>

      <section className="module-panel">
        <div className="module-panel-heading">
          <div>
            <h2>Resource Consumption</h2>
            <p>Current usage compared with allocated limits</p>
          </div>
          <span className="module-pill">Current period</span>
        </div>

        <div className="usage-resource-list">
          {usageData.map((item, index) => {
            const percentage = Math.round((item.used / item.limit) * 100);

            return (
              <motion.div
                className="usage-resource"
                key={item.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="usage-resource-heading">
                  <strong>{item.name}</strong>
                  <span>
                    {item.used.toLocaleString("en-IN")} / {item.limit.toLocaleString("en-IN")} {item.unit}
                  </span>
                </div>

                <div className="usage-track">
                  <motion.div
                    className={`usage-fill ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>

                <div className="usage-resource-footer">
                  <span>{percentage}% utilized</span>
                  <span>{(item.limit - item.used).toLocaleString("en-IN")} {item.unit} remaining</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="module-panel">
        <div className="module-panel-heading">
          <div>
            <h2>Usage Insights</h2>
            <p>Highlights from your current usage data</p>
          </div>
        </div>

        <div className="module-insight-grid">
          <div>
            <Activity size={20} />
            <strong>API performance</strong>
            <p>API requests are at 78.5% of the allocated limit.</p>
          </div>
          <div>
            <HardDrive size={20} />
            <strong>Storage capacity</strong>
            <p>320 GB of storage remains available.</p>
          </div>
          <div>
            <Cpu size={20} />
            <strong>Compute resources</strong>
            <p>Compute consumption is within the allocated limit.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Usage;

