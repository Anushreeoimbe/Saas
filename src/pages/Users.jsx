import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users as UsersIcon,
  UserCheck,
  UserX,
  Clock3,
  X,
} from "lucide-react";
import { useSaas } from "../context/SaasContext";

const ITEMS_PER_PAGE = 6;

function StatusBadge({ status }) {
  const styles = {
    Active: "status-active",
    Inactive: "status-inactive",
    Pending: "status-pending",
  };

  return (
    <span className={`user-status ${styles[status] || ""}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

function UserAvatar({ user }) {
  return (
    <div className="user-avatar">
      {user.avatar}
    </div>
  );
}

function UserDetailsDrawer({ user, onClose, onEdit, onDelete }) {
  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="drawer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.aside
          className="user-drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="drawer-header">
            <div>
              <p className="drawer-eyebrow">USER DETAILS</p>
              <h2>User Profile</h2>
            </div>

            <button className="icon-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="drawer-profile">
            <div className="drawer-avatar">{user.avatar}</div>

            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="drawer-status">
            <StatusBadge status={user.status} />
            <span>{user.plan} Plan</span>
          </div>

          <div className="drawer-section">
            <h4>Account Information</h4>

            <div className="detail-row">
              <span>Role</span>
              <strong>{user.role}</strong>
            </div>

            <div className="detail-row">
              <span>Company</span>
              <strong>{user.company}</strong>
            </div>

            <div className="detail-row">
              <span>Plan</span>
              <strong>{user.plan}</strong>
            </div>

            <div className="detail-row">
              <span>Joined Date</span>
              <strong>{user.joinedDate}</strong>
            </div>

            <div className="detail-row">
              <span>Last Login</span>
              <strong>{user.lastLogin}</strong>
            </div>
          </div>

          <div className="drawer-actions">
            <button
              className="drawer-edit-button"
              onClick={() => onEdit(user)}
            >
              <Pencil size={17} />
              Edit User
            </button>

            <button
              className="drawer-delete-button"
              onClick={() => onDelete(user)}
            >
              <Trash2 size={17} />
              Delete
            </button>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

function UserForm({ user, onClose, onSave }) {
  const [form, setForm] = useState(
    user || {
      name: "",
      email: "",
      role: "Developer",
      company: "",
      plan: "Pro",
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
    }
  );

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter the user's name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter the user's email.");
      return;
    }

    if (!form.company.trim()) {
      setError("Please enter the company name.");
      return;
    }

    setError("");
    onSave(form);
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="user-form-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="drawer-eyebrow">
              {user ? "UPDATE USER" : "NEW USER"}
            </p>

            <h2>{user ? "Edit User" : "Add New User"}</h2>
          </div>

          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option>Administrator</option>
                <option>Manager</option>
                <option>Developer</option>
                <option>Analyst</option>
              </select>
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Enter company"
              />
            </div>

            <div className="form-group">
              <label>Plan</label>
              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
              >
                <option>Free</option>
                <option>Pro</option>
                <option>Business</option>
                <option>Enterprise</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="save-user-button">
              {user ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function DeleteDialog({ user, onCancel, onConfirm }) {
  if (!user) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="delete-dialog"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="delete-icon">
          <Trash2 size={23} />
        </div>

        <h2>Delete User?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{user.name}</strong>? This action cannot be undone.
        </p>

        <div className="delete-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button className="confirm-delete-button" onClick={onConfirm}>
            Delete User
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Users() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
  } = useSaas();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue) ||
          user.company.toLowerCase().includes(searchValue)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((user) => user.status === statusFilter);
    }

    if (planFilter !== "All") {
      result = result.filter((user) => user.plan === planFilter);
    }

    result.sort((a, b) => {
      const first = String(a[sortBy]).toLowerCase();
      const second = String(b[sortBy]).toLowerCase();

      if (first < second) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (first > second) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });

    return result;
  }, [
    users,
    search,
    statusFilter,
    planFilter,
    sortBy,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  );

  const visibleUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const pendingUsers = users.filter(
    (user) => user.status === "Pending"
  ).length;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePlanFilter = (value) => {
    setPlanFilter(value);
    setCurrentPage(1);
  };

  const handleSaveUser = (form) => {
    if (editingUser) {
      updateUser(editingUser.id, form);
    } else {
      addUser(form);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(null);
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (!deletingUser) return;

    deleteUser(deletingUser.id);

    if (selectedUser?.id === deletingUser.id) {
      setSelectedUser(null);
    }

    setDeletingUser(null);
  };

  return (
    <div className="users-page">
      <motion.div
        className="users-page-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="page-eyebrow">MANAGEMENT</p>
          <h1>Users</h1>
          <p>
            Manage users, roles, subscriptions and account access.
          </p>
        </div>

        <button
          className="add-user-button"
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          Add User
        </button>
      </motion.div>

      <div className="user-stat-grid">
        <motion.div
          className="user-stat-card"
          whileHover={{ y: -4 }}
        >
          <div className="user-stat-icon">
            <UsersIcon size={21} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>
        </motion.div>

        <motion.div
          className="user-stat-card"
          whileHover={{ y: -4 }}
        >
          <div className="user-stat-icon success">
            <UserCheck size={21} />
          </div>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>
        </motion.div>

        <motion.div
          className="user-stat-card"
          whileHover={{ y: -4 }}
        >
          <div className="user-stat-icon warning">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingUsers}</strong>
          </div>
        </motion.div>

        <motion.div
          className="user-stat-card"
          whileHover={{ y: -4 }}
        >
          <div className="user-stat-icon danger">
            <UserX size={21} />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveUsers}</strong>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="users-table-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="users-toolbar">
          <div className="user-search">
            <Search size={18} />

            <input
              value={search}
              onChange={(event) =>
                handleSearch(event.target.value)
              }
              placeholder="Search users, emails or companies..."
            />

            {search && (
              <button
                onClick={() => handleSearch("")}
                className="clear-search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="user-filters">
            <div className="filter-select">
              <Filter size={16} />

              <select
                value={statusFilter}
                onChange={(event) =>
                  handleStatusFilter(event.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>

              <ChevronDown size={15} />
            </div>

            <div className="filter-select">
              <select
                value={planFilter}
                onChange={(event) =>
                  handlePlanFilter(event.target.value)
                }
              >
                <option value="All">All Plans</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Business">Business</option>
                <option value="Enterprise">Enterprise</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  <span>
                    User
                    {sortBy === "name" && (
                      <small>
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </small>
                    )}
                  </span>
                </th>

                <th onClick={() => handleSort("role")}>
                  Role
                </th>

                <th>Company</th>

                <th onClick={() => handleSort("plan")}>
                  Plan
                </th>

                <th onClick={() => handleSort("status")}>
                  Status
                </th>

                <th onClick={() => handleSort("joinedDate")}>
                  Joined
                </th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {visibleUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <div className="user-info">
                        <UserAvatar user={user} />

                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="role-text">
                        {user.role}
                      </span>
                    </td>

                    <td>{user.company}</td>

                    <td>
                      <span className={`plan-badge plan-${user.plan.toLowerCase()}`}>
                        {user.plan}
                      </span>
                    </td>

                    <td>
                      <StatusBadge status={user.status} />
                    </td>

                    <td>{user.joinedDate}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          title="View"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => handleEdit(user)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          title="Delete"
                          className="danger-action"
                          onClick={() => setDeletingUser(user)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {visibleUsers.length === 0 && (
            <div className="users-empty">
              <div>
                <Search size={28} />
              </div>

              <h3>No users found</h3>

              <p>
                Try changing your search or filter options.
              </p>
            </div>
          )}
        </div>

        <div className="users-pagination">
          <span>
            Showing{" "}
            <strong>
              {filteredUsers.length === 0
                ? 0
                : (currentPage - 1) * ITEMS_PER_PAGE + 1}
              -
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredUsers.length
              )}
            </strong>{" "}
            of <strong>{filteredUsers.length}</strong> users
          </span>

          <div className="pagination-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={
                  currentPage === index + 1 ? "active" : ""
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedUser && (
          <UserDetailsDrawer
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onEdit={handleEdit}
            onDelete={(user) => {
              setSelectedUser(null);
              setDeletingUser(user);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <UserForm
            user={editingUser}
            onClose={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
            onSave={handleSaveUser}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingUser && (
          <DeleteDialog
            user={deletingUser}
            onCancel={() => setDeletingUser(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Users;