import { useEffect, useState } from "react";
import { getCourierEntries } from "../lib/api";

export default function Reports() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getCourierEntries();
      setRows(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Reports</h1>
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <div className="overflow-auto print-only">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Customer</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Address</th>
                <th className="border p-2 text-left">PIN</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="border p-2">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="border p-2">{r.customer_name}</td>
                  <td className="border p-2">{r.phone}</td>
                  <td className="border p-2">{r.address}</td>
                  <td className="border p-2 font-semibold">{r.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
