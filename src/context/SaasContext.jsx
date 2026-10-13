
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import usersData from "../data/users";
import customersData from "../data/customers";
import subscriptionsData from "../data/subscriptions";
import plansData from "../data/plans";

const SaasContext = createContext();

const USERS_KEY = "saas_users";
const CUSTOMERS_KEY = "saas_customers";
const SUBSCRIPTIONS_KEY = "saas_subscriptions";
const PLANS_KEY = "saas_plans";

function getStoredData(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Failed to read ${key}`, error);
  }

  return fallback;
}

export function SaasProvider({ children }) {
  const [users, setUsers] = useState(() =>
    getStoredData(USERS_KEY, usersData)
  );

  const [customers, setCustomers] = useState(() =>
    getStoredData(CUSTOMERS_KEY, customersData)
  );

  const [subscriptions, setSubscriptions] = useState(() =>
    getStoredData(SUBSCRIPTIONS_KEY, subscriptionsData)
  );

  const [plans, setPlans] = useState(() =>
    getStoredData(PLANS_KEY, plansData)
  );

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(
      SUBSCRIPTIONS_KEY,
      JSON.stringify(subscriptions)
    );
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  }, [plans]);

  // USERS
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now(),
      avatar: user.name
        ? user.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "US",
    };

    setUsers((previous) => [newUser, ...previous]);
    return newUser;
  };

  const updateUser = (id, updatedUser) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers((previous) =>
      previous.filter((user) => user.id !== id)
    );
  };

  // CUSTOMERS
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
    };

    setCustomers((previous) => [newCustomer, ...previous]);
    return newCustomer;
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers((previous) =>
      previous.map((customer) =>
        customer.id === id
          ? { ...customer, ...updatedCustomer }
          : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );
  };

  // SUBSCRIPTIONS
  const addSubscription = (subscription) => {
    const newSubscription = {
      ...subscription,
      id: `SUB-${Date.now()}`,
    };

    setSubscriptions((previous) => [
      newSubscription,
      ...previous,
    ]);

    return newSubscription;
  };

  const updateSubscription = (id, updatedSubscription) => {
    setSubscriptions((previous) =>
      previous.map((subscription) =>
        subscription.id === id
          ? { ...subscription, ...updatedSubscription }
          : subscription
      )
    );
  };

  const deleteSubscription = (id) => {
    setSubscriptions((previous) =>
      previous.filter(
        (subscription) => subscription.id !== id
      )
    );
  };

  // PRICING PLANS
  const addPlan = (plan) => {
    const newPlan = {
      ...plan,
      id: `PLAN-${Date.now()}`,
      subscribers: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setPlans((previous) => [newPlan, ...previous]);
    return newPlan;
  };

  const updatePlan = (id, updatedPlan) => {
    setPlans((previous) =>
      previous.map((plan) =>
        plan.id === id
          ? { ...plan, ...updatedPlan }
          : plan
      )
    );
  };

  const deletePlan = (id) => {
    setPlans((previous) =>
      previous.filter((plan) => plan.id !== id)
    );
  };

  const togglePlanStatus = (id) => {
    setPlans((previous) =>
      previous.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status:
                plan.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : plan
      )
    );
  };

  const value = {
    users,
    customers,
    subscriptions,
    plans,

    addUser,
    updateUser,
    deleteUser,

    addCustomer,
    updateCustomer,
    deleteCustomer,

    addSubscription,
    updateSubscription,
    deleteSubscription,

    addPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus,
  };

  return (
    <SaasContext.Provider value={value}>
      {children}
    </SaasContext.Provider>
  );
}

export function useSaas() {
  const context = useContext(SaasContext);

  if (!context) {
    throw new Error(
      "useSaas must be used inside SaasProvider"
    );
  }

  return context;
}