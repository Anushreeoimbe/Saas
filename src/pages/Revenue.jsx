import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, CalendarDays } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useSaas } from "../context/SaasContext";

const monthlyRevenue = [
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 51000 },
  { month: "Jul", revenue: 48000 },
  { month: "Aug", revenue: 65000 },
  { month: "Sep", revenue: 72000 },
  { month: "Oct", revenue: 85000 },
];

function Revenue() {
  const { subscriptions = [] } = useSaas();

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === "Active"
  );

  const monthlyRecurringRevenue = activeSubscriptions.reduce(
    (total, subscription) => {
      const amount = Number(subscription.amount) || 0;
      const cycle = (subscription.billingCycle || "Monthly").toLowerCase();

      if (cycle === "yearly" || cycle === "annual") {
        return total + amount / 12;
      }

      if (cycle === "quarterly") {
        return total + amount / 3;
      }

      return total + amount;
    },
    0
  );

  const totalRevenue = activeSubscriptions.reduce(
    (total, subscription) => total + (Number(subscription.amount) || 0),
    0
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const stats = [
    {
      title: "Monthly Recurring Revenue",
      value: formatCurrency(monthlyRecurringRevenue),
      icon: DollarSign,
      description: "Estimated monthly recurring revenue",
    },
    {
      title: "Active Subscriptions",
      value: activeSubscriptions.length,
      icon: CreditCard,
      description: "Currently active subscriptions",
    },
    {
      title: "Total Active Billing",
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      description: "Sum of active subscription amounts",
    },
    {
      title: "Past Due Subscriptions",
      value: subscriptions.filter((item) => item.status === "Past Due").length,
      icon: CalendarDays,
      description: "Subscriptions requiring attention",
    },
  ];

  return (
    <div className="module-page">
      <motion.div
        className="module-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <span className="module-eyebrow">FINANCIAL OVERVIEW</span>
          <h1>Revenue</h1>
          <p>Monitor recurring revenue and subscription billing.</p>
        </div>
      </motion.div>

      <div className="module-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              className="module-stat-card"
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="module-stat-top">
                <span>{stat.title}</span>
                <div className="module-stat-icon">
                  <Icon size={20} />
                </div>
              </div>
              <h2>{stat.value}</h2>
              <p>{stat.description}</p>
            </motion.div>
          );
        })}
      </div>

      <section className="module-panel">
        <div className="module-panel-header">
          <div>
            <h2>Revenue Overview</h2>
            <p>Illustrative monthly revenue trend</p>
          </div>
          <span className="module-tag">May – October</span>
        </div>

        <div className="module-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyRevenue}
              margin={{ top: 15, right: 15, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7865e8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7865e8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `₹${value / 1000}k`}
                width={55}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7865e8"
                strokeWidth={3}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="module-panel">
        <div className="module-panel-header">
          <div>
            <h2>Subscription Billing</h2>
            <p>Active subscription amounts from your current data</p>
          </div>
        </div>

        <div className="module-table-wrap">
          <table className="module-table">
            <thead>
              <tr>
                <th>Subscription ID</th>
                <th>Customer</th>
                <th>Plan</th>
                <th>Billing Cycle</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>{subscription.id}</td>
                    <td>{subscription.customer}</td>
                    <td>{subscription.plan}</td>
                    <td>{subscription.billingCycle}</td>
                    <td>{formatCurrency(Number(subscription.amount) || 0)}</td>
                    <td>
                      <span
                        className={`module-status ${String(
                          subscription.status
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No subscription records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Revenue;

