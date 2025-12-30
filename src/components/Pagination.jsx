export default function Pagination({ page, setPage, hasNext }) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <button
        disabled={!hasNext}
        onClick={() => setPage(p => p + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
