import os
from pathlib import Path

# ============ NEXT.JS PROJECT FILES ============
nextjs_files = {
    # Pages with actual content
    "app/login/page.tsx": """
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-700">Library Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg" />
          <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">Demo: admin@library.com / password</p>
      </div>
    </div>
  );
}
""",

    "app/dashboard/page.tsx": """
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Total Books</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Active Loans</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Students</h3>
          <p className="text-2xl font-bold">789</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Overdue</h3>
          <p className="text-2xl font-bold text-red-500">12</p>
        </div>
      </div>
    </div>
  );
}
""",

    "app/dashboard/books/page.tsx": """
export default function BooksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Manage Books</h1>
      <div className="mt-4 bg-white p-4 rounded-xl shadow">
        <p className="text-gray-600">📚 Book management interface</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center border-b py-2">
            <span>Introduction to Algorithms</span>
            <span className="text-sm text-gray-500">Available: 3</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span>Database Systems</span>
            <span className="text-sm text-gray-500">Available: 2</span>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span>Computer Networks</span>
            <span className="text-sm text-gray-500">Available: 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
""",

    "app/dashboard/cataloging/page.tsx": """
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
""",

    "app/dashboard/circulation/page.tsx": """
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
""",

    "app/dashboard/reservations/page.tsx": """
export default function ReservationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Reservations</h1>
      <div className="mt-4 bg-white p-4 rounded-xl shadow">
        <div className="border-b py-3 flex justify-between">
          <div><span className="font-semibold">Introduction to Algorithms</span><p className="text-sm text-gray-600">Student: John Doe</p></div>
          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Waiting</span>
        </div>
        <div className="border-b py-3 flex justify-between">
          <div><span className="font-semibold">Database Systems</span><p className="text-sm text-gray-600">Student: Jane Smith</p></div>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Ready</span>
        </div>
      </div>
    </div>
  );
}
""",

    "app/dashboard/students/page.tsx": """
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
""",

    "app/dashboard/reports/page.tsx": """
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
""",

    "app/dashboard/settings/page.tsx": """
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
""",

    "app/dashboard/notifications/page.tsx": """
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
""",

    # Components
    "components/ui/Card.tsx": """
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export function Card({ children, className = '' }: CardProps) {
  return <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>{children}</div>;
}
""",

    "components/ui/Button.tsx": """
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}
export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const colors = {
    primary: 'bg-purple-600 hover:bg-purple-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700'
  };
  return <button className={`${colors[variant]} px-4 py-2 rounded-lg transition text-white`} onClick={onClick}>{children}</button>;
}
""",

    # Services
    "services/api.ts": """
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const api = {
  get: async (endpoint: string) => { const res = await fetch(`${API_BASE}${endpoint}`); return res.json(); },
  post: async (endpoint: string, data: any) => { const res = await fetch(`${API_BASE}${endpoint}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }); return res.json(); }
};
""",

    "services/books.ts": """
import { api } from './api';
export const booksService = {
  getAll: () => api.get('/books'),
  getById: (id: string) => api.get(`/books/${id}`),
  create: (data: any) => api.post('/books', data),
};
""",

    "services/loans.ts": """
import { api } from './api';
export const loansService = {
  getActive: () => api.get('/loans/active'),
  borrow: (bookId: string, studentId: string) => api.post('/loans', { bookId, studentId }),
  return: (loanId: string) => api.post(`/loans/${loanId}/return`),
};
""",

    "services/users.ts": """
import { api } from './api';
export const usersService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
};
""",
}

def create_files(base_path, files_dict):
    """Create files without overwriting existing ones"""
    created = 0
    skipped = 0
    
    for file_path, content in files_dict.items():
        full_path = Path(base_path) / file_path
        if not full_path.exists():
            full_path.parent.mkdir(parents=True, exist_ok=True)
            full_path.write_text(content, encoding='utf-8')
            print(f"  ✅ Created: {file_path}")
            created += 1
        else:
            print(f"  ⏭️ Skipped (already exists): {file_path}")
            skipped += 1
    
    return created, skipped

def main():
    print("\n" + "="*60)
    print("🚀 ADDING NEXT.JS LIBRARY MANAGEMENT FEATURES")
    print("="*60 + "\n")
    
    # Check if we're in the right directory
    cwd = Path.cwd()
    print(f"📂 Working directory: {cwd}")
    
    # Check if Next.js project exists
    has_next = (cwd / "package.json").exists() and (cwd / "next.config.ts").exists()
    
    if has_next:
        print("✅ Next.js project detected!")
    else:
        print("⚠️ This doesn't look like a Next.js project.")
        print("   Make sure you're running this in your my-app/ folder.")
        
        response = input("\nContinue anyway? (y/n): ").strip().lower()
        if response != 'y':
            print("Exiting...")
            return
    
    print("\n📁 Creating Next.js library management files...\n")
    
    created, skipped = create_files(".", nextjs_files)
    
    print("\n" + "="*60)
    print("✅ ALL DONE!")
    print("="*60)
    
    print(f"\n📊 Summary: {created} files created, {skipped} files skipped")
    
    print("\n📂 Added folders and files:")
    print("  📱 Next.js Pages:")
    print("     - /login")
    print("     - /dashboard")
    print("     - /dashboard/books")
    print("     - /dashboard/cataloging")
    print("     - /dashboard/circulation")
    print("     - /dashboard/reservations")
    print("     - /dashboard/students")
    print("     - /dashboard/reports")
    print("     - /dashboard/settings")
    print("     - /dashboard/notifications")
    print("\n  📁 Components:")
    print("     - ui/Card, ui/Button")
    print("\n  🔧 Services:")
    print("     - api, books, loans, users")
    
    print("\n🚀 NEXT STEP:")
    print("  npm run dev")
    print("  Then visit: http://localhost:3000/dashboard")
    
    print("\n" + "="*60 + "\n")

if __name__ == "__main__":
    main()