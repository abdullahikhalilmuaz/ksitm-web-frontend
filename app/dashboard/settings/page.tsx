
export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Settings</h1>
      <div className="mt-4 bg-white p-4 rounded-xl shadow space-y-4">
        <div><h3 className="font-semibold">Library Settings</h3><p className="text-sm text-gray-600">Fine per day: ₦50</p></div>
        <div><h3 className="font-semibold">Loan Period</h3><p className="text-sm text-gray-600">14 days</p></div>
        <div><h3 className="font-semibold">Max Books per Student</h3><p className="text-sm text-gray-600">5 books</p></div>
      </div>
    </div>
  );
}
