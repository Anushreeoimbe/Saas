import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  IndianRupee,
  Mail,
  MapPin,
  Plus,
  UserRoundCheck,
  TrendingUp,
} from "lucide-react";
import { useSaas } from "../context/SaasContext";

const PAGE_SIZE = 6;

const statuses = ["Active", "Inactive", "Pending"];

const emptyCustomer = {
  name: "",
  email: "",
  contactPerson: "",
  plan: "Pro",
  status: "Active",
  users: 1,
  revenue: 0,
  joinedDate: new Date().toISOString().slice(0, 10),
  industry: "",
  location: "",
};

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function initials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CU"
  );
}

function StatusBadge({ status }) {
  const className = String(status || "Pending")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <span className={`customer-status status-${className}`}>
      <span />
      {status || "Pending"}
    </span>
  );
}

function CustomerForm({ customer, onClose, onSave }) {
  const editing = Boolean(customer);

  const [form, setForm] = useState(() => ({
    ...emptyCustomer,
    ...(customer || {}),
  }));

  const [errors, setErrors] = useState({});

  const change = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: ["users", "revenue"].includes(name)
        ? Number(value)
        : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Customer name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.contactPerson.trim()) {
      nextErrors.contactPerson = "Contact person is required.";
    }

    if (!form.industry.trim()) {
      nextErrors.industry = "Industry is required.";
    }

    if (!form.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    if (!form.joinedDate) {
      nextErrors.joinedDate = "Join date is required.";
    }

    if (form.users < 1 || !Number.isInteger(form.users)) {
      nextErrors.users = "Users must be a whole number of at least 1.";
    }

    if (form.revenue < 0) {
      nextErrors.revenue = "Revenue cannot be negative.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      contactPerson: form.contactPerson.trim(),
      industry: form.industry.trim(),
      location: form.location.trim(),
    });
  };

  return (
    <motion.div
      className="customer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="customer-modal"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="customer-modal-header">
          <div>
            <span className="page-eyebrow">
              {editing ? "UPDATE CUSTOMER" : "CUSTOMER MANAGEMENT"}
            </span>
            <h2>{editing ? "Edit Customer" : "Add Customer"}</h2>
            <p>
              {editing
                ? "Update the customer's account information."
                : "Add a new company to your customer portfolio."}
            </p>
          </div>

          <button
            type="button"
            className="customer-icon-button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="customer-form-grid">
            <label>
              Company Name *
              <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="e.g. NovaTech Solutions"
              />
              {errors.name && <small>{errors.name}</small>}
            </label>

            <label>
              Email Address *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                placeholder="company@example.com"
              />
              {errors.email && <small>{errors.email}</small>}
            </label>

            <label>
              Contact Person *
              <input
                name="contactPerson"
                value={form.contactPerson}
                onChange={change}
                placeholder="Full name"
              />
              {errors.contactPerson && (
                <small>{errors.contactPerson}</small>
              )}
            </label>

            <label>
              Industry *
              <input
                name="industry"
                value={form.industry}
                onChange={change}
                placeholder="e.g. Technology"
              />
              {errors.industry && <small>{errors.industry}</small>}
            </label>

            <label>
              Subscription Plan
              <select
                name="plan"
                value={form.plan}
                onChange={change}
              >
                <option>Free</option>
                <option>Pro</option>
                <option>Business</option>
                <option>Enterprise</option>
              </select>
            </label>

            <label>
              Account Status
              <select
                name="status"
                value={form.status}
                onChange={change}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <label>
              Number of Users *
              <input
                type="number"
                name="users"
                min="1"
                step="1"
                value={form.users}
                onChange={change}
              />
              {errors.users && <small>{errors.users}</small>}
            </label>

            <label>
              Revenue (₹) *
              <input
                type="number"
                name="revenue"
                min="0"
                value={form.revenue}
                onChange={change}
              />
              {errors.revenue && <small>{errors.revenue}</small>}
            </label>

            <label>
              Join Date *
              <input
                type="date"
                name="joinedDate"
                value={form.joinedDate}
                onChange={change}
              />
              {errors.joinedDate && <small>{errors.joinedDate}</small>}
            </label>

            <label>
              Location *
              <input
                name="location"
                value={form.location}
                onChange={change}
                placeholder="e.g. Pune, India"
              />
              {errors.location && <small>{errors.location}</small>}
            </label>
          </div>

          <div className="customer-form-actions">
            <button
              type="button"
              className="customer-secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="customer-primary-button"
            >
              {editing ? "Save Changes" : "Create Customer"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function CustomerDrawer({ customer, onClose, onEdit }) {
  if (!customer) return null;

  return (
    <motion.div
      className="customer-overlay customer-drawer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        className="customer-drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="customer-modal-header">
          <div>
            <span className="page-eyebrow">CUSTOMER PROFILE</span>
            <h2>Account Details</h2>
          </div>

          <button
            type="button"
            className="customer-icon-button"
            onClick={onClose}
            aria-label="Close customer details"
          >
            <X size={19} />
          </button>
        </div>

        <div className="customer-profile-hero">
          <div className="customer-profile-avatar">
            {initials(customer.name)}
          </div>

          <h3>{customer.name}</h3>
          <p>{customer.email}</p>
          <StatusBadge status={customer.status} />

          <div className="customer-profile-plan">
            <span>Current Plan</span>
            <strong>{customer.plan}</strong>
          </div>
        </div>

        <div className="customer-detail-list">
          <div>
            <span><Users size={15} /> Contact Person</span>
            <strong>{customer.contactPerson || "—"}</strong>
          </div>

          <div>
            <span><Building2 size={15} /> Industry</span>
            <strong>{customer.industry || "—"}</strong>
          </div>

          <div>
            <span><MapPin size={15} /> Location</span>
            <strong>{customer.location || "—"}</strong>
          </div>

          <div>
            <span><Users size={15} /> Total Users</span>
            <strong>{Number(customer.users || 0).toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span><IndianRupee size={15} /> Revenue</span>
            <strong>{money(customer.revenue)}</strong>
          </div>

          <div>
            <span><TrendingUp size={15} /> Customer Since</span>
            <strong>{formatDate(customer.joinedDate)}</strong>
          </div>
        </div>

        <div className="customer-drawer-actions">
          <button
            type="button"
            className="customer-secondary-button"
            onClick={() => onEdit(customer)}
          >
            <Pencil size={16} /> Edit Customer
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function DeleteDialog({ customer, onClose, onConfirm }) {
  if (!customer) return null;

  return (
    <motion.div
      className="customer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="customer-confirm-dialog"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="customer-confirm-icon">
          <Trash2 size={24} />
        </div>

        <h2>Delete customer?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{customer.name}</strong>? This action cannot be undone.
        </p>

        <div className="customer-form-actions">
          <button
            type="button"
            className="customer-secondary-button"
            onClick={onClose}
          >
            Keep Customer
          </button>

          <button
            type="button"
            className="customer-danger-button"
            onClick={onConfirm}
          >
            <Trash2 size={15} /> Delete Customer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Customers() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = useSaas();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [details, setDetails] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");

  const customerList = Array.isArray(customers) ? customers : [];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = customerList.filter((customer) => {
      const matchesSearch = [
        customer.name,
        customer.email,
        customer.contactPerson,
        customer.industry,
        customer.location,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      return (
        matchesSearch &&
        (statusFilter === "All" || customer.status === statusFilter) &&
        (planFilter === "All" || customer.plan === planFilter)
      );
    });

    result.sort((a, b) => {
      let first = a[sortBy] ?? "";
      let second = b[sortBy] ?? "";

      if (typeof first === "string") first = first.toLowerCase();
      if (typeof second === "string") second = second.toLowerCase();

      if (first < second) return direction === "asc" ? -1 : 1;
      if (first > second) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [customerList, search, statusFilter, planFilter, sortBy, direction]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const activeCount = customerList.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCount = customerList.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalRevenue = customerList.reduce(
    (sum, customer) => sum + Number(customer.revenue || 0),
    0
  );

  const totalUsers = customerList.reduce(
    (sum, customer) => sum + Number(customer.users || 0),
    0
  );

  const resetPage = () => setPage(1);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (customer) => {
    setDetails(null);
    setEditing(customer);
    setFormOpen(true);
  };

  const saveCustomer = (form) => {
    if (editing) {
      updateCustomer(editing.id, form);
      notify("Customer updated successfully.");
    } else {
      addCustomer(form);
      notify("Customer created successfully.");
    }

    setFormOpen(false);
    setEditing(null);
    resetPage();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    deleteCustomer(deleteTarget.id);

    if (details?.id === deleteTarget.id) {
      setDetails(null);
    }

    setDeleteTarget(null);
    notify("Customer deleted successfully.");
    resetPage();
  };

  const sort = (field) => {
    if (sortBy === field) {
      setDirection((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setDirection("asc");
    }

    resetPage();
  };

  return (
    <div className="customers-page">
      <motion.div
        className="customers-page-header"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <span className="page-eyebrow">CUSTOMER RELATIONSHIPS</span>
          <h1>Customers</h1>
          <p>
            Manage company accounts, monitor revenue, and build lasting
            customer relationships.
          </p>
        </div>

        <button
          type="button"
          className="customer-primary-button"
          onClick={openAdd}
        >
          <Plus size={18} /> Add Customer
        </button>
      </motion.div>

      <div className="customers-stats-grid">
        {[
          {
            label: "Total Customers",
            value: customerList.length,
            icon: Building2,
            color: "purple",
          },
          {
            label: "Active Customers",
            value: activeCount,
            icon: UserRoundCheck,
            color: "green",
          },
          {
            label: "Total Users",
            value: totalUsers.toLocaleString("en-IN"),
            icon: Users,
            color: "blue",
          },
          {
            label: "Total Revenue",
            value: money(totalRevenue),
            icon: IndianRupee,
            color: "orange",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              className="customer-stat-card"
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className={`customer-stat-icon ${stat.color}`}>
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

      <section className="customers-insight-strip">
        <div className="customers-insight-icon">
          <TrendingUp size={20} />
        </div>

        <div>
          <strong>Customer overview</strong>
          <p>
            {activeCount} active accounts · {inactiveCount} inactive accounts ·{" "}
            {customerList.length - activeCount - inactiveCount} other accounts
          </p>
        </div>
      </section>

      <motion.section
        className="customers-table-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <div className="customers-toolbar">
          <div>
            <h2>Customer Directory</h2>
            <p>Search and manage your customer accounts.</p>
          </div>

          <div className="customer-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
              placeholder="Search customers..."
              aria-label="Search customers"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  resetPage();
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        <div className="customers-filter-row">
          <span>
            <Users size={15} /> {filtered.length} customer
            {filtered.length === 1 ? "" : "s"}
          </span>

          <div>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                resetPage();
              }}
              aria-label="Filter by status"
            >
              <option value="All">All Statuses</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <select
              value={planFilter}
              onChange={(event) => {
                setPlanFilter(event.target.value);
                resetPage();
              }}
              aria-label="Filter by plan"
            >
              <option value="All">All Plans</option>
              <option>Free</option>
              <option>Pro</option>
              <option>Business</option>
              <option>Enterprise</option>
            </select>
          </div>
        </div>

        <div className="customer-table-wrap">
          <table className="customer-table">
            <thead>
              <tr>
                <th onClick={() => sort("name")}>Customer ↕</th>
                <th onClick={() => sort("plan")}>Plan ↕</th>
                <th onClick={() => sort("users")}>Users ↕</th>
                <th onClick={() => sort("revenue")}>Revenue ↕</th>
                <th onClick={() => sort("status")}>Status ↕</th>
                <th onClick={() => sort("joinedDate")}>Joined ↕</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {visible.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    layout
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <td>
                      <div className="customer-table-profile">
                        <div className="customer-table-avatar">
                          {initials(customer.name)}
                        </div>

                        <div>
                          <strong>{customer.name}</strong>
                          <span>
                            <Mail size={12} />
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`customer-plan plan-${String(
                          customer.plan || "free"
                        ).toLowerCase()}`}
                      >
                        {customer.plan || "Free"}
                      </span>
                    </td>

                    <td>
                      <span className="customer-users-count">
                        <Users size={14} />
                        {Number(customer.users || 0).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td>
                      <strong className="customer-revenue">
                        {money(customer.revenue)}
                      </strong>
                    </td>

                    <td>
                      <StatusBadge status={customer.status} />
                    </td>

                    <td className="customer-joined-date">
                      {formatDate(customer.joinedDate)}
                    </td>

                    <td>
                      <div className="customer-row-actions">
                        <button
                          type="button"
                          title="View customer"
                          aria-label={`View ${customer.name}`}
                          onClick={() => setDetails(customer)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          title="Edit customer"
                          aria-label={`Edit ${customer.name}`}
                          onClick={() => openEdit(customer)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="customer-delete-action"
                          title="Delete customer"
                          aria-label={`Delete ${customer.name}`}
                          onClick={() => setDeleteTarget(customer)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {visible.length === 0 && (
            <div className="customer-empty">
              <div><Users size={28} /></div>
              <h3>No customers found</h3>
              <p>Try a different search term or change your filters.</p>

              {(search || statusFilter !== "All" || planFilter !== "All") && (
                <button
                  type="button"
                  className="customer-secondary-button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setPlanFilter("All");
                    resetPage();
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="customer-pagination">
            <span>
              Showing {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length} customers
            </span>

            <div>
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() =>
                  setPage((previous) => Math.max(1, previous - 1))
                }
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    type="button"
                    key={number}
                    className={number === safePage ? "active" : ""}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() =>
                  setPage((previous) =>
                    Math.min(totalPages, previous + 1)
                  )
                }
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </motion.section>

      <AnimatePresence>
        {formOpen && (
          <CustomerForm
            key={editing?.id || "new-customer"}
            customer={editing}
            onClose={() => {
              setFormOpen(false);
              setEditing(null);
            }}
            onSave={saveCustomer}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {details && (
          <CustomerDrawer
            key={details.id}
            customer={details}
            onClose={() => setDetails(null)}
            onEdit={openEdit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteDialog
            customer={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={confirmDelete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="customer-toast"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
