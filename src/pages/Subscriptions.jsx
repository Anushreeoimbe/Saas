import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  CreditCard,
  CalendarDays,
  IndianRupee,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Activity,
} from "lucide-react";
import { useSaas } from "../context/SaasContext";

const PAGE_SIZE = 6;

const statuses = ["Active", "Trial", "Past Due", "Cancelled"];
const plans = ["Free", "Pro", "Business", "Enterprise"];

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function formatDate(value) {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const className = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`subscription-status status-${className}`}>
      <span />
      {status}
    </span>
  );
}

function SubscriptionForm({ subscription, onClose, onSave }) {
  const editing = Boolean(subscription);

  const [form, setForm] = useState(
    subscription || {
      customer: "",
      email: "",
      plan: "Pro",
      amount: 3000,
      billingCycle: "Monthly",
      status: "Active",
      startDate: new Date().toISOString().slice(0, 10),
      renewalDate: "",
      paymentMethod: "Credit Card",
      usage: 0,
    }
  );

  const [errors, setErrors] = useState({});

  const change = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: ["amount", "usage"].includes(name) ? Number(value) : value,
    }));

    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.customer.trim()) {
      nextErrors.customer = "Customer name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.startDate) {
      nextErrors.startDate = "Start date is required.";
    }

    if (!form.renewalDate) {
      nextErrors.renewalDate = "Renewal date is required.";
    } else if (
      form.startDate &&
      form.renewalDate < form.startDate
    ) {
      nextErrors.renewalDate =
        "Renewal date must be on or after the start date.";
    }

    if (form.amount < 0) {
      nextErrors.amount = "Amount cannot be negative.";
    }

    if (form.usage < 0 || form.usage > 100) {
      nextErrors.usage = "Usage must be between 0 and 100.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave(form);
  };

  return (
    <motion.div
      className="subscription-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="subscription-modal"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.96 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="subscription-modal-header">
          <div>
            <span className="page-eyebrow">
              {editing ? "UPDATE SUBSCRIPTION" : "NEW SUBSCRIPTION"}
            </span>
            <h2>{editing ? "Edit Subscription" : "Add Subscription"}</h2>
          </div>

          <button
            type="button"
            className="subscription-icon-button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="subscription-form-grid">
            <label>
              Customer Name
              <input
                name="customer"
                value={form.customer}
                onChange={change}
                placeholder="Company name"
              />
              {errors.customer && <small>{errors.customer}</small>}
            </label>

            <label>
              Customer Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                placeholder="company@example.com"
              />
              {errors.email && <small>{errors.email}</small>}
            </label>

            <label>
              Plan
              <select name="plan" value={form.plan} onChange={change}>
                {plans.map((plan) => (
                  <option key={plan}>{plan}</option>
                ))}
              </select>
            </label>

            <label>
              Billing Amount (₹)
              <input
                name="amount"
                type="number"
                min="0"
                value={form.amount}
                onChange={change}
              />
              {errors.amount && <small>{errors.amount}</small>}
            </label>

            <label>
              Billing Cycle
              <select
                name="billingCycle"
                value={form.billingCycle}
                onChange={change}
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={change}>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <label>
              Start Date
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={change}
              />
              {errors.startDate && <small>{errors.startDate}</small>}
            </label>

            <label>
              Renewal Date
              <input
                type="date"
                name="renewalDate"
                value={form.renewalDate}
                onChange={change}
              />
              {errors.renewalDate && <small>{errors.renewalDate}</small>}
            </label>

            <label>
              Payment Method
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={change}
              >
                <option>Credit Card</option>
                <option>UPI</option>
                <option>Bank Transfer</option>
                <option>None</option>
              </select>
            </label>

            <label>
              Usage (%)
              <input
                name="usage"
                type="number"
                min="0"
                max="100"
                value={form.usage}
                onChange={change}
              />
              {errors.usage && <small>{errors.usage}</small>}
            </label>
          </div>

          <div className="subscription-form-actions">
            <button
              type="button"
              className="subscription-secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="subscription-primary-button">
              {editing ? "Save Changes" : "Create Subscription"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function SubscriptionDrawer({ item, onClose, onEdit, onCancel }) {
  if (!item) return null;

  return (
    <motion.div
      className="subscription-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        className="subscription-drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="subscription-modal-header">
          <div>
            <span className="page-eyebrow">SUBSCRIPTION DETAILS</span>
            <h2>{item.id}</h2>
          </div>
          <button
            type="button"
            className="subscription-icon-button"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={19} />
          </button>
        </div>

        <div className="subscription-detail-hero">
          <div className="subscription-detail-icon">
            <CreditCard size={26} />
          </div>
          <h3>{item.customer}</h3>
          <p>{item.email}</p>
          <StatusBadge status={item.status} />
          <strong>{money(item.amount)}</strong>
          <span>{item.billingCycle} billing</span>
        </div>

        <div className="subscription-detail-list">
          <div><span>Subscription ID</span><strong>{item.id}</strong></div>
          <div><span>Plan</span><strong>{item.plan}</strong></div>
          <div><span>Start Date</span><strong>{formatDate(item.startDate)}</strong></div>
          <div><span>Renewal Date</span><strong>{formatDate(item.renewalDate)}</strong></div>
          <div><span>Payment Method</span><strong>{item.paymentMethod}</strong></div>
          <div><span>Usage</span><strong>{item.usage}%</strong></div>
        </div>

        <div className="subscription-usage">
          <div>
            <span>Plan usage</span>
            <strong>{item.usage}%</strong>
          </div>
          <div className="subscription-progress">
            <span style={{ width: `${item.usage}%` }} />
          </div>
        </div>

        <div className="subscription-form-actions">
          <button
            type="button"
            className="subscription-secondary-button"
            onClick={() => onEdit(item)}
          >
            <Pencil size={16} /> Edit
          </button>
          {item.status !== "Cancelled" && (
            <button
              type="button"
              className="subscription-danger-button"
              onClick={() => onCancel(item)}
            >
              <X size={16} /> Cancel Subscription
            </button>
          )}
        </div>
      </motion.aside>
    </motion.div>
  );
}

function ConfirmDialog({ item, onClose, onConfirm }) {
  if (!item) return null;

  return (
    <motion.div
      className="subscription-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="subscription-confirm-dialog"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="subscription-confirm-icon">
          <RefreshCw size={24} />
        </div>
        <h2>Cancel subscription?</h2>
        <p>
          Are you sure you want to cancel <strong>{item.id}</strong> for{" "}
          <strong>{item.customer}</strong>? The status will be changed to
          Cancelled.
        </p>
        <div className="subscription-form-actions">
          <button
            type="button"
            className="subscription-secondary-button"
            onClick={onClose}
          >
            Keep Subscription
          </button>
          <button
            type="button"
            className="subscription-danger-button"
            onClick={onConfirm}
          >
            Confirm Cancellation
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Subscriptions() {
  const {
    subscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  } = useSaas();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [cycleFilter, setCycleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("renewalDate");
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);

  const [details, setDetails] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const filtered = useMemo(() => {
    const result = subscriptions.filter((item) => {
      const query = search.toLowerCase();

      return (
        (item.customer.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query)) &&
        (statusFilter === "All" || item.status === statusFilter) &&
        (planFilter === "All" || item.plan === planFilter) &&
        (cycleFilter === "All" || item.billingCycle === cycleFilter)
      );
    });

    result.sort((a, b) => {
      let first = a[sortBy];
      let second = b[sortBy];

      if (typeof first === "string") {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      if (first < second) return direction === "asc" ? -1 : 1;
      if (first > second) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [subscriptions, search, statusFilter, planFilter, cycleFilter, sortBy, direction]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeCount = subscriptions.filter((item) => item.status === "Active").length;
  const trialCount = subscriptions.filter((item) => item.status === "Trial").length;
  const pastDueCount = subscriptions.filter((item) => item.status === "Past Due").length;
  const monthlyRevenue = subscriptions
    .filter((item) => item.status === "Active")
    .reduce((sum, item) => {
      if (item.billingCycle === "Yearly") return sum + item.amount / 12;
      if (item.billingCycle === "Quarterly") return sum + item.amount / 3;
      return sum + item.amount;
    }, 0);

  const resetPage = () => setPage(1);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setDetails(null);
    setEditing(item);
    setFormOpen(true);
  };

  const saveForm = (form) => {
    if (editing) {
      updateSubscription(editing.id, form);
    } else {
      addSubscription(form);
    }

    setFormOpen(false);
    setEditing(null);
  };

  const confirmCancellation = () => {
    if (!cancelTarget) return;

    if (deleteMode) {
      deleteSubscription(cancelTarget.id);
    } else {
      updateSubscription(cancelTarget.id, { status: "Cancelled" });
    }

    if (details?.id === cancelTarget.id) setDetails(null);

    setCancelTarget(null);
    setDeleteMode(false);
  };

  const sort = (field) => {
    if (sortBy === field) {
      setDirection((previous) => previous === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setDirection("asc");
    }
    resetPage();
  };

  return (
    <div className="subscriptions-page">
      <motion.div
        className="subscriptions-page-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <span className="page-eyebrow">RECURRING REVENUE</span>
          <h1>Subscriptions</h1>
          <p>Manage plans, billing cycles, renewals and subscription health.</p>
        </div>
        <button type="button" className="subscription-primary-button" onClick={openAdd}>
          <Plus size={18} /> Add Subscription
        </button>
      </motion.div>

      <div className="subscriptions-stats-grid">
        {[
          { label: "Total Subscriptions", value: subscriptions.length, icon: CreditCard, color: "purple" },
          { label: "Active Subscriptions", value: activeCount, icon: Activity, color: "green" },
          { label: "Trial Accounts", value: trialCount, icon: Users, color: "blue" },
          { label: "Monthly Recurring Revenue", value: money(Math.round(monthlyRevenue)), icon: IndianRupee, color: "orange" },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              className="subscription-stat-card"
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className={`subscription-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="subscription-health-strip">
        <div>
          <CalendarDays size={19} />
          <span>
            <strong>{pastDueCount}</strong> subscriptions need payment attention
          </span>
        </div>
        <span className="subscription-health-note">
          Review past-due accounts to reduce churn.
        </span>
      </div>

      <motion.section
        className="subscriptions-table-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="subscriptions-toolbar">
          <div className="subscription-search">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
              placeholder="Search ID, customer or email..."
            />
          </div>

          <div className="subscription-filters">
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); resetPage(); }}>
              <option value="All">All Statuses</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>

            <select value={planFilter} onChange={(event) => { setPlanFilter(event.target.value); resetPage(); }}>
              <option value="All">All Plans</option>
              {plans.map((plan) => <option key={plan}>{plan}</option>)}
            </select>

            <select value={cycleFilter} onChange={(event) => { setCycleFilter(event.target.value); resetPage(); }}>
              <option value="All">All Billing Cycles</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        <div className="subscription-table-wrap">
          <table className="subscription-table">
            <thead>
              <tr>
                <th onClick={() => sort("id")}>Subscription ↕</th>
                <th onClick={() => sort("customer")}>Customer ↕</th>
                <th onClick={() => sort("plan")}>Plan ↕</th>
                <th onClick={() => sort("amount")}>Amount ↕</th>
                <th onClick={() => sort("status")}>Status ↕</th>
                <th onClick={() => sort("renewalDate")}>Renewal Date ↕</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {visible.map((item) => (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                  >
                    <td>
                      <strong className="subscription-id">{item.id}</strong>
                      <span className="subscription-cycle">{item.billingCycle}</span>
                    </td>
                    <td>
                      <div className="subscription-customer-cell">
                        <div className="subscription-customer-avatar">
                          {item.customer.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <strong>{item.customer}</strong>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className={`subscription-plan plan-${item.plan.toLowerCase()}`}>{item.plan}</span></td>
                    <td>
                      <strong className="subscription-amount">{money(item.amount)}</strong>
                      <span className="subscription-cycle">/{item.billingCycle === "Yearly" ? "year" : item.billingCycle === "Quarterly" ? "quarter" : "month"}</span>
                    </td>
                    <td><StatusBadge status={item.status} /></td>
                    <td className="subscription-date">{formatDate(item.renewalDate)}</td>
                    <td>
                      <div className="subscription-actions">
                        <button type="button" title="View details" onClick={() => setDetails(item)}><Eye size={16} /></button>
                        <button type="button" title="Edit" onClick={() => openEdit(item)}><Pencil size={16} /></button>
                        <button
                          type="button"
                          title="Cancel subscription"
                          className="subscription-delete-action"
                          onClick={() => { setDeleteMode(false); setCancelTarget(item); }}
                          disabled={item.status === "Cancelled"}
                        >
                          <RefreshCw size={15} />
                        </button>
                        <button
                          type="button"
                          title="Delete record"
                          className="subscription-delete-action"
                          onClick={() => { setDeleteMode(true); setCancelTarget(item); }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {visible.length === 0 && (
            <div className="subscription-empty">
              <CreditCard size={34} />
              <h3>No subscriptions found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="subscription-pagination">
            <span>
              Showing {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div>
              <button type="button" disabled={safePage === 1} onClick={() => setPage((previous) => Math.max(1, previous - 1))}>
                <ChevronLeft size={17} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <button type="button" key={number} className={number === safePage ? "active" : ""} onClick={() => setPage(number)}>
                  {number}
                </button>
              ))}
              <button type="button" disabled={safePage === totalPages} onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </motion.section>

      <AnimatePresence>
        {formOpen && (
          <SubscriptionForm
            subscription={editing}
            onClose={() => { setFormOpen(false); setEditing(null); }}
            onSave={saveForm}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {details && (
          <SubscriptionDrawer
            item={details}
            onClose={() => setDetails(null)}
            onEdit={openEdit}
            onCancel={(item) => { setDeleteMode(false); setCancelTarget(item); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cancelTarget && (
          <ConfirmDialog
            item={cancelTarget}
            onClose={() => { setCancelTarget(null); setDeleteMode(false); }}
            onConfirm={confirmCancellation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
