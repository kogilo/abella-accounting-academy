import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCourse } from "./actions";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
            <p className="text-slate-600">
              Create, edit, publish, and delete accounting courses.
            </p>
          </div>

          <Link
            href="/admin/courses/new"
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            New Course
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border bg-white">
          {courses.length === 0 ? (
            <p className="p-6 text-slate-500">No courses yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-t">
                    <td className="p-4 font-medium">{course.title}</td>
                    <td className="p-4 text-slate-500">{course.slug}</td>
                    <td className="p-4">
                      {course.published ? "Published" : "Draft"}
                    </td>
                    <td className="flex gap-3 p-4">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="text-blue-600"
                      >
                        Edit
                      </Link>

                      <form action={deleteCourse.bind(null, course.id)}>
                        <button className="text-red-600">Delete</button>
                      </form>

                      <Link
                        href={`/admin/courses/${course.id}/lessons`}
                        className="text-green-700"
                      >
                        Lessons
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}