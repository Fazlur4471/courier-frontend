// src/hooks/useCouriers.js
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export function useCouriers() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/couriers`);
    const data = await res.json();
    setEntries(data);
    setLoading(false);
  }

  async function createEntry(payload) {
    const res = await fetch(`${API_BASE}/couriers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setEntries((prev) => [data, ...prev]);
  }

  async function updateStatus(id, status) {
    await fetch(`${API_BASE}/couriers/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  }

  return {
    entries,
    loading,
    createEntry,
    updateStatus,
  };
}
