import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-6 space-y-4">
        <a href="/admin/courses" className="block p-4 border rounded">
          Manage Courses
        </a>
      </div>
    </main>
  );
}