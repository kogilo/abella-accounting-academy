import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCourse } from "../actions";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) notFound();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Edit Course</h1>

        <form action={updateCourse.bind(null, course.id)} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Course Title</label>
            <input
              name="title"
              required
              defaultValue={course.title}
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={course.description || ""}
              className="mt-1 w-full rounded-lg border p-3"
              rows={5}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={course.published}
            />
            Published
          </label>

          <button className="rounded-lg bg-slate-900 px-5 py-2 text-white">
            Update Course
          </button>
        </form>
      </div>
    </main>
  );
}