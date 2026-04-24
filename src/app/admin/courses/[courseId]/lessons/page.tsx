import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { deleteLesson } from "../../actions-lessons";

export default async function CourseLessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const lessons = course.modules.flatMap((module) => module.lessons);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-slate-600">Manage lessons and rich content.</p>
          </div>

          <Link
            href={`/admin/courses/${course.id}/lessons/new`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            New Lesson
          </Link>
        </div>

        <div className="mt-8 rounded-xl border bg-white">
          {lessons.length === 0 ? (
            <p className="p-6 text-slate-500">No lessons yet.</p>
          ) : (
            lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between border-b p-4"
              >
                <div>
                  <h2 className="font-semibold">{lesson.title}</h2>
                  <p className="text-sm text-slate-500">{lesson.slug}</p>
                </div>

                <div className="flex gap-4">
                  <Link
                    href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <form action={deleteLesson.bind(null, course.id, lesson.id)}>
                    <button className="text-red-600">Delete</button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}