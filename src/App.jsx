import { useEffect, useState } from "react";
import Layout from "./app/Layout";
import Dashboard from "./app/Dashboard";
import CourierForm from "./app/CourierForm";
import Records from "./app/Records";
import PrintLabel from "./app/PrintLabel";
import Reports from "./app/Reports";
import PasswordGate from "./components/PasswordGate";

const API_BASE = "https://courier-backend-y6zt.onrender.com/api";



export default function App() {
  const [authorized, setAuthorized] = useState(
    localStorage.getItem("maharaja_auth") === "true"
  );

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Hooks ALWAYS run
  useEffect(() => {
    if (authorized) {
      fetchEntries();
    }
  }, [authorized]);

  async function fetchEntries() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/couriers`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("API fetch failed", err);
    }
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

  async function deleteEntry(id) {
    if (!confirm("Delete this record permanently?")) return;
    await fetch(`${API_BASE}/couriers/${id}`, { method: "DELETE" });
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function renderPage() {
    if (loading) return <p>Loading…</p>;

    if (currentPage === "dashboard")
      return <Dashboard entries={entries} setCurrentPage={setCurrentPage} />;

    if (currentPage === "new")
      return <CourierForm createEntry={createEntry} setCurrentPage={setCurrentPage} />;

    if (currentPage === "records")
      return (
        <Records
          entries={entries}
          updateStatus={updateStatus}
          deleteEntry={deleteEntry}
          setCurrentPage={setCurrentPage}
        />
      );

    if (currentPage === "print")
      return <PrintLabel entries={entries} />;

    if (currentPage === "reports")
      return <Reports entries={entries} />;

    return null;
  }

  // 🔐 AUTH GATE — AFTER hooks
  if (!authorized) {
    return <PasswordGate onSuccess={() => setAuthorized(true)} />;
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}
