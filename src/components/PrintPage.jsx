import PrintPreview from "./PrintPreview";

export default function PrintPage({ data, color, size }) {
  const copiesPerPage = size === "Postcard" ? 2 : 1;

  return (
    <div className="print-only">
      {Array.from({ length: copiesPerPage }).map((_, i) => (
        <PrintPreview
          key={i}
          data={data}
          color={color}
          size={size}
        />
      ))}
    </div>
  );
}