import AppSidebar from "../components/AppSidebar";

export default function Layout({ currentPage, setCurrentPage, children }) {
  const handleLogout = () => {
    localStorage.removeItem("maharaja_auth");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b flex items-center px-6 justify-between">
          <h2 className="font-medium capitalize">
            {currentPage.replace("-", " ")}
          </h2>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </header>

        <section className="flex-1 p-6 overflow-y-auto">
          {children}
        </section>
      </main>
    </div>
  );
}
