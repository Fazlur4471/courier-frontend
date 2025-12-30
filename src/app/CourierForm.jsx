import { useState } from "react";
import { Printer, Save } from "lucide-react";

export default function CourierForm({ createEntry, setCurrentPage }) {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    pincode: "",
    notes: "",
  });

  const [savedAt, setSavedAt] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (goToPrint = false) => {
    if (
      !form.customer_name ||
      !form.phone ||
      !form.address ||
      !form.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    await createEntry(form);

    const now = new Date();
    setSavedAt(now.toLocaleString("en-IN"));

    setForm({
      customer_name: "",
      phone: "",
      address: "",
      pincode: "",
      notes: "",
    });

    setSubmitting(false);

    if (goToPrint) {
      setCurrentPage("print");
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          New Courier Entry
        </h1>
        <p className="text-sm text-slate-500">
          Enter receiver details and generate dispatch record
        </p>
      </div>

      {/* FROM ADDRESS */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">
          From (Sender)
        </h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium text-slate-900">
              MAHARAJA ELECTRONICS
            </p>
            <p className="text-slate-600">Ismail – Proprietor</p>
          </div>

          <div>
            <p className="text-slate-600">
              📞 +91 98765 43210<br />
              📞 +91 87654 32109
            </p>
          </div>

          <div className="col-span-2 text-slate-600">
            123, Main Bazaar Street<br />
            Salem – 636001<br />
            Tamil Nadu, India
          </div>
        </div>
      </div>

      {/* TO ADDRESS */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        <h2 className="text-sm font-semibold text-slate-700">
          To (Receiver)
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name *
            </label>
            <input
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Customer full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="10-digit mobile number"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Full Address *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 resize-none"
              placeholder="House no, street, area, landmark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Pincode *
            </label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="6-digit pincode"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Notes (Optional)
            </label>
            <input
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Fragile, urgent, etc."
            />
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          {savedAt && (
            <>
              Entry saved at{" "}
              <span className="font-medium text-slate-700">
                {savedAt}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
          >
            <Save size={16} />
            Save Entry
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            <Printer size={16} />
            Save & Print
          </button>
        </div>
      </div>
    </div>
  );
}
