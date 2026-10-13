import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Bell,
  ShieldCheck,
  UserRound,
  Palette,
  Save,
} from "lucide-react";

const SETTINGS_KEY = "saas_app_settings";

const defaultSettings = {
  companyName: "SaaSly",
  adminName: "Anushree Oimbe",
  email: "admin@saasly.com",
  timezone: "Asia/Kolkata",
  currency: "INR",
  emailNotifications: true,
  subscriptionAlerts: true,
  weeklyReports: false,
  compactMode: false,
};

function getSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function Settings() {
  const [settings, setSettings] = useState(getSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return undefined;

    const timer = window.setTimeout(() => setMessage(""), 2500);
    return () => window.clearTimeout(timer);
  }, [message]);

  const change = (event) => {
    const { name, value, checked, type } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveSettings = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      setMessage("Settings saved successfully.");
    } catch {
      setMessage("Unable to save settings in this browser.");
    }
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <span className="page-eyebrow">WORKSPACE PREFERENCES</span>
          <h1>Settings</h1>
          <p>Manage your workspace details, notifications, and preferences.</p>
        </div>
      </div>

      <form className="module-settings-form" onSubmit={saveSettings}>
        <motion.section
          className="module-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="module-panel-heading">
            <div className="module-settings-heading-icon"><UserRound /></div>
            <div>
              <h2>Workspace Information</h2>
              <p>Configure your company and administrator details.</p>
            </div>
          </div>

          <div className="module-settings-grid">
            <label>
              Workspace Name
              <input
                name="companyName"
                value={settings.companyName}
                onChange={change}
                required
              />
            </label>

            <label>
              Administrator Name
              <input
                name="adminName"
                value={settings.adminName}
                onChange={change}
                required
              />
            </label>

            <label>
              Administrator Email
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={change}
                required
              />
            </label>

            <label>
              Time Zone
              <select name="timezone" value={settings.timezone} onChange={change}>
                <option value="Asia/Kolkata">India Standard Time (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="Europe/London">London</option>
              </select>
            </label>

            <label>
              Display Currency
              <select name="currency" value={settings.currency} onChange={change}>
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
            </label>
          </div>
        </motion.section>

        <motion.section
          className="module-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="module-panel-heading">
            <div className="module-settings-heading-icon"><Bell /></div>
            <div>
              <h2>Notifications</h2>
              <p>Choose which dashboard alerts you want to enable.</p>
            </div>
          </div>

          <div className="module-settings-options">
            {[
              {
                name: "emailNotifications",
                title: "Email Notifications",
                description: "Receive general account and workspace updates.",
              },
              {
                name: "subscriptionAlerts",
                title: "Subscription Alerts",
                description: "Show reminders for renewals and past-due subscriptions.",
              },
              {
                name: "weeklyReports",
                title: "Weekly Reports",
                description: "Enable the preference for weekly business summaries.",
              },
            ].map((item) => (
              <label className="module-setting-row" key={item.name}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>

                <input
                  type="checkbox"
                  name={item.name}
                  checked={settings[item.name]}
                  onChange={change}
                />
              </label>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="module-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <div className="module-panel-heading">
            <div className="module-settings-heading-icon"><Palette /></div>
            <div>
              <h2>Appearance</h2>
              <p>Adjust how dashboard content is displayed.</p>
            </div>
          </div>

          <label className="module-setting-row">
            <span>
              <strong>Compact Mode Preference</strong>
              <small>Save your preference for a denser dashboard layout.</small>
            </span>

            <input
              type="checkbox"
              name="compactMode"
              checked={settings.compactMode}
              onChange={change}
            />
          </label>
        </motion.section>

        <motion.section
          className="module-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="module-panel-heading">
            <div className="module-settings-heading-icon"><ShieldCheck /></div>
            <div>
              <h2>Security</h2>
              <p>Basic account security information.</p>
            </div>
          </div>

          <div className="module-security-note">
            <ShieldCheck size={21} />
            <div>
              <strong>Local application settings</strong>
              <p>
                These preferences are saved in this browser. This screen does
                not change your login credentials or server security settings.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="module-settings-footer">
          {message && <span role="status">{message}</span>}

          <button type="submit" className="module-save-button">
            <Save size={17} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
