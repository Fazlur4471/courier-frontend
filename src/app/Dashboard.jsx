import {
  Package,
  Calendar,
  BarChart3,
  Plus,
  Printer
} from "lucide-react";

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
        <Icon className="text-slate-700" size={22} />
      </div>
    </div>
  );
}

export default function Dashboard({ entries, setCurrentPage }) {
  // --- Metrics ---
  const today = new Date().toDateString();

  const totalShipments = entries.length;

  const todayShipments = entries.filter(
    (e) => new Date(e.created_at).toDateString() === today
  ).length;

  const monthShipments = entries.filter((e) => {
    const d = new Date(e.created_at);
    const n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  }).length;

  const recentEntries = entries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Overview of courier activity
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage("new")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800"
          >
            <Plus size={16} />
            New Entry
          </button>

          <button
            onClick={() => setCurrentPage("print")}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-slate-700 hover:bg-slate-100"
          >
            <Printer size={16} />
            Print Label
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard
          title="Total Shipments"
          value={totalShipments}
          icon={Package}
        />
        <MetricCard
          title="Today’s Shipments"
          value={todayShipments}
          icon={Calendar}
        />
        <MetricCard
          title="This Month"
          value={monthShipments}
          icon={BarChart3}
        />
      </div>

      {/* Recent Entries */}
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="font-medium text-slate-900">
            Recent Shipments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 text-left font-medium">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Customer
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Phone
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-right font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {recentEntries.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-6 text-center text-slate-500"
                  >
                    No shipments yet
                  </td>
                </tr>
              )}

              {recentEntries.map((e) => (
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
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${
                          e.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : e.status === "In Transit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => setCurrentPage("print")}
                      className="text-slate-700 hover:underline text-sm"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
