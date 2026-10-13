import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  CreditCard,
  DollarSign,
  Download,
  Search,
  ChartNoAxesCombined,
} from "lucide-react";
import { useSaas } from "../context/SaasContext";

function Reports() {
  const {
    users = [],
    customers = [],
    subscriptions = [],
    plans = [],
  } = useSaas();

  const [search, setSearch] = useState("");

  const reports = useMemo(
    () => [
      {
        id: "users",
        title: "User Report",
        description: "Overview of registered users and their account status.",
        icon: Users,
        count: users.length,
        label: "Total users",
        data: users,
      },
      {
        id: "customers",
        title: "Customer Report",
        description: "Customer accounts, plans, and business details.",
        icon: ChartNoAxesCombined,
        count: customers.length,
        label: "Total customers",
        data: customers,
      },
      {
        id: "subscriptions",
        title: "Subscription Report",
        description: "Subscription plans, billing amounts, and statuses.",
        icon: CreditCard,
        count: subscriptions.length,
        label: "Total subscriptions",
        data: subscriptions,
      },
      {
        id: "plans",
        title: "Pricing Plan Report",
        description: "Available plans and their pricing information.",
        icon: DollarSign,
        count: plans.length,
        label: "Total plans",
        data: plans,
      },
    ],
    [users, customers, subscriptions, plans]
  );

  const filteredReports = reports.filter((report) =>
    `${report.title} ${report.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function exportCSV(report) {
    const rows = report.data;

    if (!rows.length) {
      window.alert("There is no data available to export.");
      return;
    }

    const headers = [
      ...new Set(rows.flatMap((row) => Object.keys(row))),
    ];

    const escapeCSV = (value) => {
      const text =
        value === null || value === undefined
          ? ""
          : typeof value === "object"
            ? JSON.stringify(value)
            : String(value);

      return `"${text.replace(/"/g, '""')}"`;
    };

    const csv = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        headers.map((header) => escapeCSV(row[header])).join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.id}-report.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="module-page">
      <motion.div
        className="module-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <span className="module-eyebrow">BUSINESS INTELLIGENCE</span>
          <h1>Reports</h1>
          <p>Explore your SaaS data and export reports for analysis.</p>
        </div>
      </motion.div>

      <div className="reports-summary">
        <div>
          <div className="reports-summary-icon">
            <FileText size={22} />
          </div>
          <div>
            <h3>{reports.length} Reports Available</h3>
            <p>Reports generated from your current application data.</p>
          </div>
        </div>
      </div>

      <div className="reports-toolbar">
        <div className="reports-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search reports..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search reports"
          />
        </div>
        <span className="reports-count">
          {filteredReports.length} reports
        </span>
      </div>

      <div className="reports-grid">
        {filteredReports.map((report, index) => {
          const Icon = report.icon;

          return (
            <motion.article
              className="reports-card"
              key={report.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="reports-card-top">
                <div className={`reports-icon reports-icon-${report.id}`}>
                  <Icon size={22} />
                </div>
                <span className="reports-file-type">CSV EXPORT</span>
              </div>

              <h2>{report.title}</h2>
              <p className="reports-description">{report.description}</p>

              <div className="reports-card-divider" />

              <div className="reports-card-bottom">
                <div>
                  <strong>{report.count}</strong>
                  <span>{report.label}</span>
                </div>

                <button
                  className="reports-export-button"
                  type="button"
                  onClick={() => exportCSV(report)}
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="reports-empty">
          <Search size={28} />
          <h3>No reports found</h3>
          <p>Try a different search term.</p>
        </div>
      )}
    </div>
  );
}

export default Reports;
