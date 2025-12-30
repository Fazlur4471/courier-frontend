export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name or phone..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full max-w-sm border rounded-md px-3 py-2 text-sm"
    />
  );
}
