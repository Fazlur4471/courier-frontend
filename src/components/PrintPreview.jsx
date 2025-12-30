export default function PrintPreview({
  data,
  color = "Black & White",
  size = "Postcard"
}) {
  const sizeMap = {
    Postcard: { w: "100mm", h: "150mm" },
    A4: { w: "210mm", h: "297mm" }
  };

  const { w, h } = sizeMap[size];
  const isColor = color === "Color";

  return (
    <div
      className={`print-label ${
        isColor ? "print-color" : "print-bw"
      }`}
      style={{
        width: w,
        height: h
      }}
    >
      <div className="border-b pb-2 mb-2">
        <h1 className="text-sm font-bold tracking-wide">
          MAHARAJA ELECTRONICS
        </h1>
        <p className="text-xs">Ismail – Proprietor</p>
        <p className="text-xs">
          +91 98765 43210, +91 98765 32109
        </p>
      </div>

      <div className="text-xs mb-2">
        <p className="font-semibold uppercase">From</p>
        <p>
          123, Main Bazaar Street<br />
          Salem – 636001<br />
          Tamil Nadu, India
        </p>
      </div>

      <hr className="border-dashed my-2" />

      <div className="text-xs">
        <p className="font-semibold uppercase">To</p>
        <p className="font-bold mt-1">
          {data.customer_name}
        </p>
        <p>{data.phone}</p>
        <p className="mt-1">{data.address}</p>
        <p className="font-bold mt-1">
          PIN: {data.pincode}
        </p>
      </div>

      <p className="text-[10px] mt-3 text-gray-500">
        Printed on {new Date().toLocaleString()}
      </p>
    </div>
  );
}
