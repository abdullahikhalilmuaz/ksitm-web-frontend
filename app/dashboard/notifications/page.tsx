
export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Notifications</h1>
      <div className="mt-4 space-y-3">
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <p className="font-semibold">📬 3 books due tomorrow</p>
          <p className="text-sm text-gray-600">Send reminder to students</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
          <p className="font-semibold">✅ 2 books returned today</p>
          <p className="text-sm text-gray-600">Process returned books</p>
        </div>
      </div>
    </div>
  );
}
