import { useState } from "react";

export default function PasswordGate({ onSuccess }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (value === import.meta.env.VITE_APP_PASSWORD) {
      localStorage.setItem("maharaja_auth", "true");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Maharaja Electronics
        </h1>

        <input
          type="password"
          placeholder="Enter access password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {error && (
          <p className="text-red-600 text-sm mb-2">
            Invalid password
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
