export default function PrintPreview({ data }) {
  return (
    <div className="print-only w-full h-full p-10 text-black">
      <div className="grid grid-cols-2 gap-14 h-full">

        {/* FROM */}
        <div className="text-left">
          <p className="text-lg font-bold">FROM</p>

          <p className="mt-4 text-xl font-bold">
            MAHARAJA ELECTRONICS
          </p>
          <p className="mt-4 text-xl font-semibold">
            Ismail – Proprietor
          </p>
          <p className="mt-4 text-xl mt-1">
            📞 +91 98431 14920
          </p>

          <div className="mt-4 text-xl leading-relaxed">
            No-30, Erikadu<br />
            Next to Kattabomman Hospital<br />
            Behind Veerapandiyanagar<br />
            Salem – 636004<br />
            Tamil Nadu, India
          </div>
        </div>

        {/* TO */}
        <div className="text-right">
          <p className="mt-4 text-2xl">TO</p>

          <p className="mt-4 text-2xl font-bold">
            {data.customer_name}
          </p>
          <p className="mt-4 text-2xl">
            {data.phone}
          </p>

          <div className="mt-4 text-2xl leading-relaxed">
            {data.address}
          </div>

          <p className="mt-4 text-2xl font-bold">
            PIN: {data.pincode}
          </p>
        </div>

      </div>

      <div className="mt-6 text-xs text-gray-500">
        Printed on {new Date().toLocaleString("en-IN")}
      </div>
    </div>
  );
}
