import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Printer,
  BarChart3
} from "lucide-react";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "new", label: "New Entry", icon: PlusCircle },
  { id: "records", label: "Records", icon: FileText },
  { id: "print", label: "Print", icon: Printer },
  { id: "reports", label: "Reports", icon: BarChart3 }
];

export default function AppSidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-lg font-bold">MAHARAJA</h1>
        <p className="text-xs text-slate-400">Electronics Courier</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {nav.map(item => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
                ${active ? "bg-slate-800" : "hover:bg-slate-800/60"}`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
