import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
  DollarSign,
  Activity,
} from "lucide-react";

const iconMap = {
  users: Users,
  subscriptions: CreditCard,
  revenue: DollarSign,
  usage: Activity,
};

function StatCard({
  title,
  value,
  change,
  description,
  icon = "users",
  positive = true,
}) {
  const Icon = iconMap[icon] || Users;

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35 }}
    >
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <div className={`stat-change ${positive ? "positive" : "negative"}`}>
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {change}
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-title">{title}</div>

      {description && (
        <div className="stat-description">{description}</div>
      )}
    </motion.div>
  );
}

export default StatCard;