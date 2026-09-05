
export default function StudentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Students</h1>
      <div className="mt-4 bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center border-b py-2">
          <div><span className="font-semibold">Alice Johnson</span><p className="text-sm text-gray-600">ID: KSITM-2026-001</p></div>
          <span className="text-sm text-green-600">Active</span>
        </div>
        <div className="flex justify-between items-center border-b py-2">
          <div><span className="font-semibold">Bob Williams</span><p className="text-sm text-gray-600">ID: KSITM-2026-002</p></div>
          <span className="text-sm text-red-600">Overdue</span>
        </div>
      </div>
    </div>
  );
}
