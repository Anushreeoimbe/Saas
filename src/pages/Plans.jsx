
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CircleDollarSign,
  Crown,
  Edit3,
  Eye,
  Layers3,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useSaas } from "../context/SaasContext";

const initialForm = {
  name: "",
  description: "",
  price: "",
  billingCycle: "Monthly",
  status: "Active",
  features: ["", "", ""],
  maxUsers: "10",
  storage: "10 GB",
};

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

function StatusBadge({ status }) {
  return (
    <span
      className={`plan-status ${
        status === "Active" ? "is-active" : "is-inactive"
      }`}
    >
      <span />
      {status}
    </span>
  );
}

function PlanForm({ plan, onClose, onSave }) {
  const [form, setForm] = useState(() =>
    plan
      ? {
          ...plan,
          price: String(plan.price),
          features: [...plan.features],
          maxUsers: String(plan.maxUsers),
        }
      : { ...initialForm, features: ["", "", ""] }
  );

  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateFeature = (index, value) => {
    setForm((previous) => ({
      ...previous,
      features: previous.features.map((feature, featureIndex) =>
        featureIndex === index ? value : feature
      ),
    }));
  };

  const addFeature = () => {
    setForm((previous) => ({
      ...previous,
      features: [...previous.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setForm((previous) => ({
      ...previous,
      features: previous.features.filter(
        (_, featureIndex) => featureIndex !== index
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter a plan name.");
      return;
    }

    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      setError("Enter a valid price that is zero or greater.");
      return;
    }

    const features = form.features
      .map((feature) => feature.trim())
      .filter(Boolean);

    if (features.length === 0) {
      setError("Add at least one plan feature.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please enter a plan description.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      maxUsers:
        form.maxUsers === "Unlimited"
          ? "Unlimited"
          : Number(form.maxUsers) || 1,
      features,
    });
  };

  return (
    <motion.div
      className="plans-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="plans-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-form-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22 }}
      >
        <div className="plans-modal-heading">
          <div>
            <span className="plans-eyebrow">
              PLAN CONFIGURATION
            </span>
            <h2 id="plan-form-title">
              {plan ? "Edit pricing plan" : "Create pricing plan"}
            </h2>
            <p>
              Configure pricing, capacity and included features.
            </p>
          </div>

          <button
            type="button"
            className="plans-icon-button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={19} />
          </button>
        </div>

        <form className="plans-form" onSubmit={handleSubmit}>
          <div className="plans-form-grid">
            <label>
              Plan name *
              <input
                value={form.name}
                onChange={(event) =>
                  updateField("name", event.target.value)
                }
                placeholder="e.g. Professional"
                maxLength={40}
                required
              />
            </label>

            <label>
              Price (INR) *
              <input
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(event) =>
                  updateField("price", event.target.value)
                }
                placeholder="3000"
                required
              />
            </label>

            <label>
              Billing cycle
              <select
                value={form.billingCycle}
                onChange={(event) =>
                  updateField("billingCycle", event.target.value)
                }
              >
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </label>

            <label>
              Plan status
              <select
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value)
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>

            <label>
              Maximum users
              <select
                value={form.maxUsers}
                onChange={(event) =>
                  updateField("maxUsers", event.target.value)
                }
              >
                <option value="3">3 users</option>
                <option value="10">10 users</option>
                <option value="20">20 users</option>
                <option value="50">50 users</option>
                <option value="100">100 users</option>
                <option value="Unlimited">Unlimited</option>
              </select>
            </label>

            <label>
              Storage capacity
              <select
                value={form.storage}
                onChange={(event) =>
                  updateField("storage", event.target.value)
                }
              >
                <option>1 GB</option>
                <option>10 GB</option>
                <option>50 GB</option>
                <option>100 GB</option>
                <option>250 GB</option>
                <option>500 GB</option>
                <option>1 TB</option>
                <option>Unlimited</option>
              </select>
            </label>
          </div>

          <label>
            Description *
            <textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Describe who this plan is designed for."
              rows={3}
              maxLength={180}
              required
            />
          </label>

          <div className="plans-feature-editor">
            <div className="plans-feature-title">
              <div>
                <strong>Included features</strong>
                <span>Add the features customers receive.</span>
              </div>

              <button
                type="button"
                className="plans-add-feature"
                onClick={addFeature}
              >
                <Plus size={15} /> Add feature
              </button>
            </div>

            {form.features.map((feature, index) => (
              <div className="plans-feature-input" key={index}>
                <Check size={16} />
                <input
                  value={feature}
                  onChange={(event) =>
                    updateFeature(index, event.target.value)
                  }
                  placeholder={`Feature ${index + 1}`}
                  maxLength={100}
                />

                {form.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    aria-label={`Remove feature ${index + 1}`}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="plans-form-error" role="alert">
              {error}
            </p>
          )}

          <div className="plans-form-actions">
            <button
              type="button"
              className="plans-secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="plans-primary-button">
              {plan ? "Save changes" : "Create plan"}
            </button>
          </div>
        </form>
      </motion.section>
    </motion.div>
  );
}

function PlanDetails({ plan, onClose, onEdit }) {
  return (
    <motion.div
      className="plans-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="plans-modal plans-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-details-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
      >
        <div className="plans-modal-heading">
          <div>
            <span className="plans-eyebrow">PLAN OVERVIEW</span>
            <h2 id="plan-details-title">{plan.name}</h2>
            <p>{plan.description}</p>
          </div>

          <button
            className="plans-icon-button"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={19} />
          </button>
        </div>

        <div className="plans-details-price">
          <div>
            <span>Plan price</span>
            <strong>{formatMoney(plan.price)}</strong>
            <small>per {plan.billingCycle.toLowerCase()}</small>
          </div>
          <StatusBadge status={plan.status} />
        </div>

        <div className="plans-detail-metrics">
          <div>
            <Users size={18} />
            <span>Maximum users</span>
            <strong>{plan.maxUsers}</strong>
          </div>

          <div>
            <Layers3 size={18} />
            <span>Storage capacity</span>
            <strong>{plan.storage}</strong>
          </div>

          <div>
            <Crown size={18} />
            <span>Subscribers</span>
            <strong>{plan.subscribers ?? 0}</strong>
          </div>
        </div>

        <div className="plans-details-features">
          <h3>What's included</h3>

          {(plan.features || []).map((feature, index) => (
            <div key={`${feature}-${index}`}>
              <span><Check size={15} /></span>
              {feature}
            </div>
          ))}
        </div>

        <div className="plans-form-actions">
          <button
            className="plans-secondary-button"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="plans-primary-button"
            onClick={() => onEdit(plan)}
          >
            <Edit3 size={15} /> Edit plan
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

function DeleteConfirmation({ plan, onClose, onConfirm }) {
  return (
    <motion.div
      className="plans-overlay plans-confirm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="plans-confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-plan-title"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
      >
        <div className="plans-delete-icon">
          <Trash2 size={22} />
        </div>

        <h2 id="delete-plan-title">Delete {plan.name}?</h2>

        <p>
          This will permanently remove this pricing plan from your
          dashboard. This action cannot be undone.
        </p>

        <div className="plans-form-actions">
          <button
            className="plans-secondary-button"
            onClick={onClose}
          >
            Keep plan
          </button>

          <button
            className="plans-danger-button"
            onClick={onConfirm}
          >
            Delete plan
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default function Plans() {
  const {
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus,
  } = useSaas();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [billingFilter, setBillingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [modalPlan, setModalPlan] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [detailsPlan, setDetailsPlan] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase();

    return plans
      .filter((plan) => {
        const matchesSearch =
          plan.name.toLowerCase().includes(query) ||
          plan.description.toLowerCase().includes(query) ||
          plan.id.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "All" || plan.status === statusFilter;

        const matchesBilling =
          billingFilter === "All" ||
          plan.billingCycle === billingFilter;

        return matchesSearch && matchesStatus && matchesBilling;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "subscribers") {
          return (b.subscribers || 0) - (a.subscribers || 0);
        }

        return a.name.localeCompare(b.name);
      });
  }, [plans, search, statusFilter, billingFilter, sortBy]);

  const totalSubscribers = plans.reduce(
    (total, plan) => total + (Number(plan.subscribers) || 0),
    0
  );

  const activePlans = plans.filter(
    (plan) => plan.status === "Active"
  ).length;

  const averagePrice = plans.length
    ? plans.reduce(
        (total, plan) => total + (Number(plan.price) || 0),
        0
      ) / plans.length
    : 0;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const openCreateForm = () => {
    setModalPlan(null);
    setFormOpen(true);
  };

  const openEditForm = (plan) => {
    setDetailsPlan(null);
    setModalPlan(plan);
    setFormOpen(true);
  };

  const handleSave = (formData) => {
    if (modalPlan) {
      updatePlan(modalPlan.id, formData);
      showToast("Pricing plan updated successfully.");
    } else {
      addPlan(formData);
      showToast("Pricing plan created successfully.");
    }

    setFormOpen(false);
    setModalPlan(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    deletePlan(deleteTarget.id);
    setDeleteTarget(null);
    showToast("Pricing plan deleted.");
  };

  const handleToggleStatus = (plan) => {
    togglePlanStatus(plan.id);
    showToast(
      `${plan.name} plan ${
        plan.status === "Active" ? "deactivated" : "activated"
      }.`
    );
  };

  return (
    <div className="plans-page">
      <motion.div
        className="plans-page-header"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <div className="plans-breadcrumb">
            Workspace <span>/</span> Pricing plans
          </div>

          <h1>Pricing plans</h1>

          <p>
            Build flexible pricing experiences and manage your
            subscription offerings.
          </p>
        </div>

        <button
          className="plans-primary-button"
          onClick={openCreateForm}
        >
          <Plus size={18} />
          Create new plan
        </button>
      </motion.div>

      <div className="plans-stats-grid">
        {[
          {
            label: "Total plans",
            value: plans.length,
            icon: Layers3,
            color: "purple",
            note: "Across all billing models",
          },
          {
            label: "Active plans",
            value: activePlans,
            icon: ShieldCheck,
            color: "green",
            note: "Available to customers",
          },
          {
            label: "Total subscribers",
            value: totalSubscribers.toLocaleString("en-IN"),
            icon: Users,
            color: "blue",
            note: "Across all pricing plans",
          },
          {
            label: "Average plan price",
            value: formatMoney(averagePrice),
            icon: CircleDollarSign,
            color: "orange",
            note: "Average listed price",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              className="plans-stat-card"
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -3 }}
            >
              <div className={`plans-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>

              <div className="plans-stat-label">{stat.label}</div>

              <strong className="plans-stat-value">
                {stat.value}
              </strong>

              <span className="plans-stat-note">{stat.note}</span>
            </motion.div>
          );
        })}
      </div>

      <section className="plans-toolbar">
        <div className="plans-toolbar-title">
          <div>
            <h2>All pricing plans</h2>
            <p>
              Manage plan features, pricing, and availability.
            </p>
          </div>

          <span className="plans-result-count">
            {filteredPlans.length} plans
          </span>
        </div>

        <div className="plans-filters">
          <div className="plans-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search plans..."
              aria-label="Search plans"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={billingFilter}
            onChange={(event) =>
              setBillingFilter(event.target.value)
            }
            aria-label="Filter by billing cycle"
          >
            <option value="All">All billing cycles</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort plans"
          >
            <option value="name">Sort: Name</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="subscribers">Most subscribers</option>
          </select>
        </div>
      </section>

      <div className="plans-grid">
        <AnimatePresence mode="popLayout">
          {filteredPlans.map((plan, index) => (
            <motion.article
              className="plan-card"
              key={plan.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, delay: index * 0.025 }}
              whileHover={{ y: -4 }}
            >
              <div className="plan-card-top">
                <div className={`plan-symbol plan-symbol-${index % 4}`}>
                  {index % 4 === 0 && <Zap size={21} />}
                  {index % 4 === 1 && <ShieldCheck size={21} />}
                  {index % 4 === 2 && <Crown size={21} />}
                  {index % 4 === 3 && <Layers3 size={21} />}
                </div>

                <div className="plan-card-actions">
                  <button
                    onClick={() => setDetailsPlan(plan)}
                    title="View plan"
                    aria-label={`View ${plan.name}`}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => openEditForm(plan)}
                    title="Edit plan"
                    aria-label={`Edit ${plan.name}`}
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(plan)}
                    title="Delete plan"
                    aria-label={`Delete ${plan.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="plan-card-name-row">
                <h3>{plan.name}</h3>
                <StatusBadge status={plan.status} />
              </div>

              <p className="plan-card-description">
                {plan.description}
              </p>

              <div className="plan-price">
                <strong>{formatMoney(plan.price)}</strong>
                <span>
                  / {plan.billingCycle === "Yearly" ? "year" : "month"}
                </span>
              </div>

              <div className="plan-card-divider" />

              <div className="plan-capacity">
                <div>
                  <Users size={16} />
                  <span>Team members</span>
                  <strong>{plan.maxUsers}</strong>
                </div>

                <div>
                  <Layers3 size={16} />
                  <span>Storage</span>
                  <strong>{plan.storage}</strong>
                </div>
              </div>

              <div className="plan-features-heading">
                Included features
              </div>

              <ul className="plan-feature-list">
                {(plan.features || []).slice(0, 5).map(
                  (feature, featureIndex) => (
                    <li key={`${feature}-${featureIndex}`}>
                      <span><Check size={14} /></span>
                      {feature}
                    </li>
                  )
                )}
              </ul>

              {(plan.features || []).length > 5 && (
                <p className="plan-more-features">
                  +{plan.features.length - 5} more features
                </p>
              )}

              <div className="plan-card-footer">
                <div className="plan-subscriber-info">
                  <div className="plan-subscriber-icon">
                    <Users size={15} />
                  </div>

                  <span>
                    <strong>{plan.subscribers ?? 0}</strong>
                    {" "}subscribers
                  </span>
                </div>

                <button
                  className={`plan-toggle ${
                    plan.status === "Active" ? "enabled" : ""
                  }`}
                  onClick={() => handleToggleStatus(plan)}
                  role="switch"
                  aria-checked={plan.status === "Active"}
                  aria-label={`Toggle ${plan.name} plan status`}
                >
                  <span />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {filteredPlans.length === 0 && (
          <div className="plans-empty-state">
            <div><Search size={25} /></div>
            <h3>No pricing plans found</h3>
            <p>
              Try changing your search or filters, or create a new plan.
            </p>

            <button
              className="plans-primary-button"
              onClick={openCreateForm}
            >
              <Plus size={17} /> Create a plan
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {formOpen && (
          <PlanForm
            plan={modalPlan}
            onClose={() => {
              setFormOpen(false);
              setModalPlan(null);
            }}
            onSave={handleSave}
          />
        )}

        {detailsPlan && (
          <PlanDetails
            plan={plans.find((plan) => plan.id === detailsPlan.id) || detailsPlan}
            onClose={() => setDetailsPlan(null)}
            onEdit={openEditForm}
          />
        )}

        {deleteTarget && (
          <DeleteConfirmation
            plan={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="plans-toast"
            role="status"
            initial={{ opacity: 0, y: 18, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span><Check size={17} /></span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}