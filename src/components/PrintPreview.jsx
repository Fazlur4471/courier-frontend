export default function PrintPreview({
  data,
  color = "Black & White",
  size = "Postcard",
  preview = false
}) {
  const sizeMap = {
    Postcard: { w: "100mm", h: "150mm" },
    A4: { w: "210mm", h: "297mm" }
  };

  const { w, h } = sizeMap[size];
  const isColor = color === "Color";

  return (
    <div
      className={`
        ${preview ? "print-preview" : "print-only"}
        ${isColor ? "print-color" : "print-bw"}
      `}
      style={{
        width: w,
        height: h,
        padding: "12mm"
      }}
    >
      {/* HEADER */}
      <div className="border-b pb-2 mb-3">
        <h1 className="text-sm font-bold tracking-wide">
          MAHARAJA ELECTRONICS
        </h1>
        <p className="text-xs">Ismail – Proprietor</p>
        <p className="text-xs">
          +91 98431 14920 / +91 75983 14920
        </p>
      </div>

      {/* FROM */}
      <div className="text-xs mb-3">
        <p className="font-semibold uppercase">From</p>
        <p>
          No-30, Erikadu, Next to Kattabomman hospital<br />
          Behind Veerapandiyanagar, New Bus Stand<br />
          Salem – 636004<br />
          Tamil Nadu, India
        </p>
      </div>

      <hr className="border-dashed my-3" />

      {/* TO */}
      <div className="text-xs">
        <p className="font-semibold uppercase">To</p>
        <p className="font-bold mt-1">{data.customer_name}</p>
        <p>{data.phone}</p>
        <p className="mt-1 whitespace-pre-line">
          {data.address}
        </p>
        <p className="font-bold mt-1">
          PIN: {data.pincode}
        </p>
      </div>

      {/* FOOTER */}
      <p className="text-[10px] mt-4 text-gray-500">
        Printed on {new Date().toLocaleString("en-IN")}
      </p>
    </div>
  );
}
