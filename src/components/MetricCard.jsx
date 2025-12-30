export default function MetricCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
