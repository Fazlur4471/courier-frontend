export default function PageHeader({ title, actions }) {
  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div>{actions}</div>
    </div>
  );
}
