import QRCode from "react-qr-code";

const QRCodeGenerator = () => {
  const totalTables = 20;

  const baseUrl = `${window.location.origin}/menu`;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex flex-col md:flex-row justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-red-600">
            📱 Restaurant QR Codes
          </h1>

          <p className="text-gray-500 mt-2">
            Print and place one QR code on each table.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          🖨️ Print QR Codes
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

        {Array.from({ length: totalTables }, (_, index) => {
          const tableNumber = index + 1;
          const qrValue = `${baseUrl}?table=${tableNumber}`;

          return (
            <div
              key={tableNumber}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 flex flex-col items-center hover:scale-105 hover:shadow-3xl transition-all duration-300"
            >

              <h2 className="text-2xl font-extrabold text-red-600">
                MJ RESTAURANT
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                Scan • Order • Enjoy
              </p>

              <div className="bg-white p-3 rounded-xl shadow">
                <QRCode
                  value={qrValue}
                  size={180}
                />
              </div>

              <h1 className="mt-5 text-3xl font-black text-gray-800">
                TABLE {tableNumber}
              </h1>

              <p className="mt-2 text-green-600 font-semibold">
                Scan to Order Food
              </p>

              <div className="w-full border-t mt-5 pt-3">
                <p className="text-xs text-center text-gray-400">
                  Powered by MJ Restaurant
                </p>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default QRCodeGenerator;