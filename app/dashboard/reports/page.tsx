
export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Reports</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold">📊 Most Borrowed Books</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p>1. Introduction to Algorithms - 45 times</p>
            <p>2. Database Systems - 38 times</p>
            <p>3. Computer Networks - 29 times</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold">💰 Fine Collection</h3>
          <p className="text-2xl font-bold text-orange-500 mt-2">₦12,500</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>
      </div>
    </div>
  );
}
