import { useMemo, useState } from "react";
import { Printer, Trash2, Search } from "lucide-react";

const PAGE_SIZE = 10;

export default function Records({
  entries,
  updateStatus,
  deleteEntry,
  setCurrentPage,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  // -----------------------------
  // FILTERING LOGIC
  // -----------------------------
  const filteredEntries = useMemo(() => {
    let data = [...entries];
    const now = new Date();

    // Date filters
    if (filter === "today") {
      data = data.filter(
        (e) =>
          new Date(e.created_at).toDateString() === now.toDateString()
      );
    }

    if (filter === "week") {
      const weekAgo = new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      data = data.filter(
        (e) => new Date(e.created_at) >= weekAgo
      );
    }

    if (filter === "month") {
      data = data.filter((e) => {
        const d = new Date(e.created_at);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      });
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (e) =>
          e.customer_name.toLowerCase().includes(q) ||
          e.phone.includes(q)
      );
    }

    return data;
  }, [entries, search, filter]);

  // -----------------------------
  // PAGINATION
  // -----------------------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / PAGE_SIZE)
  );

  const paginatedEntries = filteredEntries.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Courier Records
        </h1>
        <p className="text-sm text-slate-500">
          View and manage all dispatched couriers
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-80">
          <Search
            size={16}
            className="absolute left-3 top-3 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name or phone"
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {[
            ["all", "All"],
            ["today", "Today"],
            ["week", "This Week"],
            ["month", "This Month"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setFilter(key);
                setPage(1);
              }}
              className={`px-3 py-2 rounded-lg text-sm border
                ${
                  filter === key
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-3 text-left">Date & Time</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedEntries.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-6 text-center text-slate-500"
                >
                  No records found
                </td>
              </tr>
            )}

            {paginatedEntries.map((e) => (
              <tr
                key={e.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-3">
                  {new Date(e.created_at).toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-3 font-medium">
                  {e.customer_name}
                </td>

                <td className="px-6 py-3">{e.phone}</td>

                <td className="px-6 py-3 max-w-xs truncate" title={e.address}>
                  {e.address}
                </td>

                <td className="px-6 py-3">
                  <select
                    value={e.status}
                    onChange={(ev) =>
                      updateStatus(e.id, ev.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option>Pending</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                  </select>
                </td>

                <td className="px-6 py-3 text-right space-x-3">
                  <button
                    onClick={() => setCurrentPage("print")}
                    className="text-slate-700 hover:underline"
                  >
                    <Printer size={16} />
                  </button>

                  <button
                    onClick={() => deleteEntry(e.id)}
                    className="text-red-600 hover:underline"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-slate-500">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
