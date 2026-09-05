
export default function CirculationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Circulation</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition cursor-pointer">
          <h3 className="text-4xl font-bold text-blue-500">📖</h3>
          <p className="mt-2 font-semibold">Issue Book</p>
          <p className="text-sm text-gray-500">Borrow to student</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition cursor-pointer">
          <h3 className="text-4xl font-bold text-green-500">↩️</h3>
          <p className="mt-2 font-semibold">Return Book</p>
          <p className="text-sm text-gray-500">Accept return</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition cursor-pointer">
          <h3 className="text-4xl font-bold text-orange-500">🔄</h3>
          <p className="mt-2 font-semibold">Renew</p>
          <p className="text-sm text-gray-500">Extend due date</p>
        </div>
      </div>
    </div>
  );
}
