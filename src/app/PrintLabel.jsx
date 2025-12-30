import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import PrintPage from "../components/PrintPage";

export default function PrintLabel({ entries }) {
  const [selectedId, setSelectedId] = useState("");
  const [mode, setMode] = useState("bw");
  const [paper, setPaper] = useState("Postcard"); // Add this line - it was missing!
  
  const selectedEntry = entries.find((e) => e.id === selectedId) || null;

  useEffect(() => {
    if (entries.length && !selectedId) {
      setSelectedId(entries[0].id);
    }
  }, [entries, selectedId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Screen UI - Hidden during print */}
      <div className="space-y-6 no-print">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Print Label
          </h1>
          <p className="text-sm text-slate-500">
            Preview and print courier address label
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Entry selector */}
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            {entries.map((e) => (
              <option key={e.id} value={e.id}>
                {e.customer_name} — {e.phone}
              </option>
            ))}
          </select>

          {/* Paper size */}
          <select
            value={paper}
            onChange={(e) => setPaper(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="A4">A4</option>
            <option value="Postcard">Postcard</option>
          </select>

          {/* Color mode */}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="bw">Black & White</option>
            <option value="color">Color</option>
          </select>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            <Printer size={16} />
            Print
          </button>
        </div>

        {/* Screen Preview */}
        {!selectedEntry && (
          <p className="text-slate-500">No entry selected</p>
        )}

        {selectedEntry && (
          <div
            className={`
              mx-auto border bg-white shadow-sm p-6
              ${paper === "A4" ? "w-[210mm] h-[297mm]" : ""}
              ${paper === "Postcard" ? "w-[148mm] h-[100mm]" : ""}
            `}
          >
            <div className="h-full flex flex-col justify-between">
              {/* Header */}
              <div className="border-b pb-3 mb-4">
                <h2 className="text-lg font-bold">
                  MAHARAJA ELECTRONICS
                </h2>
                <p className="text-sm">Ismail – Proprietor</p>
                <p className="text-sm">
                  📞 +91 98765 43210, +91 87654 32109
                </p>
              </div>

              {/* FROM */}
              <div className="mb-4">
                <p className="text-xs font-semibold mb-1">FROM</p>
                <p className="text-sm">
                  123, Main Bazaar Street<br />
                  Salem – 636001<br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="border-t border-dashed my-4"></div>

              {/* TO */}
              <div className="mb-4">
                <p className="text-xs font-semibold mb-1">TO</p>
                <p className="font-semibold text-base">
                  {selectedEntry.customer_name}
                </p>
                <p className="text-sm">{selectedEntry.phone}</p>
                <p className="text-sm whitespace-pre-line">
                  {selectedEntry.address}
                </p>
                <p className="text-base font-bold mt-2">
                  PIN: {selectedEntry.pincode}
                </p>
              </div>

              {/* Footer */}
              <div className="text-xs text-slate-500">
                Printed on {new Date().toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print-only content */}
      {selectedEntry && (
        <PrintPage
          data={selectedEntry}
          color={mode === "color" ? "Color" : "Black & White"}
          size={paper}
        />
      )}
    </>
  );
}