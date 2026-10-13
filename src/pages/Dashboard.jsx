import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
  DollarSign,
  Activity,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  UserPlus,
  CreditCard as PaymentIcon,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/dashboard/StatCard";

const revenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22400 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 27600 },
  { month: "May", revenue: 31200 },
  { month: "Jun", revenue: 35800 },
  { month: "Jul", revenue: 42100 },
  { month: "Aug", revenue: 48600 },
  { month: "Sep", revenue: 54200 },
  { month: "Oct", revenue: 62800 },
  { month: "Nov", revenue: 70400 },
  { month: "Dec", revenue: 82450 },
];

const customerData = [
  { month: "Jan", customers: 520 },
  { month: "Feb", customers: 680 },
  { month: "Mar", customers: 810 },
  { month: "Apr", customers: 940 },
  { month: "May", customers: 1120 },
  { month: "Jun", customers: 1280 },
  { month: "Jul", customers: 1450 },
  { month: "Aug", customers: 1690 },
  { month: "Sep", customers: 1880 },
  { month: "Oct", customers: 2140 },
  { month: "Nov", customers: 2380 },
  { month: "Dec", customers: 2640 },
];

const subscriptionData = [
  { name: "Pro", value: 46 },
  { name: "Business", value: 31 },
  { name: "Enterprise", value: 15 },
  { name: "Free", value: 8 },
];

const usageData = [
  { name: "API", value: 82 },
  { name: "Storage", value: 68 },
  { name: "Automation", value: 74 },
  { name: "Analytics", value: 91 },
];

const activities = [
  {
    icon: UserPlus,
    title: "New customer registered",
    description: "Sarah Williams joined your platform",
    time: "8 min ago",
  },
  {
    icon: PaymentIcon,
    title: "Payment received",
    description: "$1,299 payment from Acme Corporation",
    time: "24 min ago",
  },
  {
    icon: CheckCircle2,
    title: "Subscription upgraded",
    description: "TechFlow upgraded to Business",
    time: "1 hour ago",
  },
  {
    icon: TrendingUp,
    title: "Revenue milestone reached",
    description: "Monthly revenue crossed $80K",
    time: "2 hours ago",
  },
];

const insights = [
  {
    title: "Revenue is growing",
    text: "Your revenue increased 18.6% compared with last month.",
    type: "positive",
  },
  {
    title: "Customer retention",
    text: "92.4% of customers renewed their subscriptions this month.",
    type: "positive",
  },
  {
    title: "Usage opportunity",
    text: "Enterprise customers have 14% unused capacity.",
    type: "neutral",
  },
];

const animation = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function Dashboard() {
  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        description="Monitor your SaaS business performance in real time"
      />

      {/* HERO */}
      <motion.section
        className="dashboard-hero"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="hero-badge">
              <Sparkles size={14} />
              LIVE BUSINESS OVERVIEW
            </div>

            <h1>
              Grow your SaaS.
              <br />
              <span>Understand your business.</span>
            </h1>

            <p>
              Get a complete view of customers, subscriptions, revenue and
              product usage from one powerful workspace.
            </p>

            <div className="hero-actions">
              <button className="hero-primary-btn">
                View Analytics
                <ArrowRight size={16} />
              </button>

              <button className="hero-secondary-btn">
                Download Report
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-orbit"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />

          <div className="orbit-center">
            <TrendingUp size={27} />
            <strong>+24.8%</strong>
            <span>Growth</span>
          </div>

          <div className="floating-stat floating-stat-one">
            <DollarSign size={16} />
            <div>
              <strong>$82.4K</strong>
              <span>Revenue</span>
            </div>
          </div>

          <div className="floating-stat floating-stat-two">
            <Users size={16} />
            <div>
              <strong>12.8K</strong>
              <span>Users</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* KPI CARDS */}
      <div className="dashboard-grid">
        <StatCard
          title="Total Revenue"
          value="$128,450"
          change="12.5%"
          description="Compared to last month"
          icon="revenue"
        />

        <StatCard
          title="Total Users"
          value="12,840"
          change="8.2%"
          description="Compared to last month"
          icon="users"
        />

        <StatCard
          title="Active Subscriptions"
          value="8,426"
          change="6.4%"
          description="Compared to last month"
          icon="subscriptions"
        />

        <StatCard
          title="Product Usage"
          value="78.6%"
          change="4.8%"
          description="Compared to last month"
          icon="usage"
        />
      </div>

      {/* REVENUE + CUSTOMER */}
      <div className="analytics-grid">
        <motion.section className="dashboard-card revenue-card" {...animation}>
          <div className="card-heading">
            <div>
              <h3>Revenue Overview</h3>
              <p>Monthly revenue performance</p>
            </div>

            <div className="chart-value">
              <strong>$82,450</strong>
              <span>
                <ArrowUpRight size={13} />
                18.6%
              </span>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity={0.3} />
                    <stop offset="100%" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eef0f5"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#969eaf" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#969eaf" }}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />

                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5b5ce2"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section className="dashboard-card customer-card" {...animation}>
          <div className="card-heading">
            <div>
              <h3>Customer Growth</h3>
              <p>New customers this year</p>
            </div>

            <div className="mini-period">12 Months</div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eef0f5"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#969eaf" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#969eaf" }}
                />

                <Tooltip
                  formatter={(value) => [value, "Customers"]}
                  contentStyle={{
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  }}
                />

                <Bar
                  dataKey="customers"
                  fill="#8b7cf6"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </div>

      {/* SUBSCRIPTIONS + USAGE */}
      <div className="bottom-grid">
        <motion.section className="dashboard-card" {...animation}>
          <div className="card-heading">
            <div>
              <h3>Subscription Distribution</h3>
              <p>Current plan breakdown</p>
            </div>
          </div>

          <div className="subscription-layout">
            <div className="donut-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={82}
                    paddingAngle={4}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          ["#5b5ce2", "#8b7cf6", "#48a9a6", "#d8dbea"][
                            index
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center">
                <strong>8.4K</strong>
                <span>Active</span>
              </div>
            </div>

            <div className="legend-list">
              {subscriptionData.map((item, index) => (
                <div className="legend-item" key={item.name}>
                  <div>
                    <span
                      className="legend-dot"
                      style={{
                        background: [
                          "#5b5ce2",
                          "#8b7cf6",
                          "#48a9a6",
                          "#d8dbea",
                        ][index],
                      }}
                    />
                    {item.name}
                  </div>

                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="dashboard-card" {...animation}>
          <div className="card-heading">
            <div>
              <h3>Product Usage</h3>
              <p>Platform feature utilization</p>
            </div>

            <Activity size={20} color="#5b5ce2" />
          </div>

          <div className="usage-list">
            {usageData.map((item) => (
              <div className="usage-row" key={item.name}>
                <div className="usage-info">
                  <span>{item.name}</span>
                  <strong>{item.value}%</strong>
                </div>

                <div className="usage-track">
                  <motion.div
                    className="usage-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* ACTIVITY + INSIGHTS */}
      <div className="activity-grid">
        <motion.section className="dashboard-card" {...animation}>
          <div className="card-heading">
            <div>
              <h3>Recent Activity</h3>
              <p>Latest events across your platform</p>
            </div>

            <button className="view-all-btn">View all</button>
          </div>

          <div className="activity-list">
            {activities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  className="activity-item"
                  key={item.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="activity-icon">
                    <Icon size={17} />
                  </div>

                  <div className="activity-content">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>

                  <time>{item.time}</time>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section className="dashboard-card" {...animation}>
          <div className="card-heading">
            <div>
              <h3>Business Insights</h3>
              <p>Smart observations from your data</p>
            </div>
          </div>

          <div className="insight-list">
            {insights.map((item, index) => (
              <motion.div
                className={`insight-item ${item.type}`}
                key={item.title}
                whileHover={{ x: 4 }}
              >
                <div className="insight-number">0{index + 1}</div>

                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Dashboard;