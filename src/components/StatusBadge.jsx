export default function StatusBadge({ status }) {
  const map = {
    Pending: "bg-yellow-100 text-yellow-800",
    Delivered: "bg-green-100 text-green-800",
    "In Transit": "bg-blue-100 text-blue-800"
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-slate-100 text-slate-800"
      }`}
    >
      {status}
    </span>
  );
}
