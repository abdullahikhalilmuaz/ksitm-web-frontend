
export default function CatalogingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Cataloging Module</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold">📋 Generate Accession Number</h3>
          <p className="text-sm text-gray-600 mt-2">KSITM-2026-000123</p>
          <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            Generate New
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold">🏷️ Print Label</h3>
          <p className="text-sm text-gray-600 mt-2">QR + Barcode ready</p>
          <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
            Generate Label
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold">📍 Shelf Location</h3>
          <p className="text-sm text-gray-600 mt-2">CS-F1-B3-R4</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
            Update Location
          </button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold">📊 Inventory Audit</h3>
          <p className="text-sm text-gray-600 mt-2">Last audit: Jan 2026</p>
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
            Start Audit
          </button>
        </div>
      </div>
    </div>
  );
}
