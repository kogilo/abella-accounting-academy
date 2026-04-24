import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RichLessonEditor from "@/components/editor/RichLessonEditor";
import { updateLesson } from "../../../actions-lessons";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) notFound();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Edit Lesson</h1>

        <form
          action={updateLesson.bind(null, courseId, lesson.id)}
          className="mt-6 space-y-5"
        >
          <div>
            <label className="text-sm font-medium">Lesson Title</label>
            <input
              name="title"
              required
              defaultValue={lesson.title}
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Lesson Content</label>
            <div className="mt-2">
              <RichLessonEditor defaultContent={lesson.contentHtml || ""} />
            </div>
          </div>

          <button className="rounded-lg bg-slate-900 px-5 py-2 text-white">
            Update Lesson
          </button>
        </form>
      </div>
    </main>
  );
}