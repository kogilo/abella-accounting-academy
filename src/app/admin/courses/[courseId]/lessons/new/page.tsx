import RichLessonEditor from "@/components/editor/RichLessonEditor";
import { createLesson } from "../../../actions-lessons";

export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Create Lesson</h1>

        <form action={createLesson.bind(null, courseId)} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Lesson Title</label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="Debits and Credits"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Lesson Content</label>
            <div className="mt-2">
              <RichLessonEditor
                defaultContent={`
                  <h2>Accounting Example</h2>
                  <p>Use the table below to explain journal entries.</p>
                  <table>
                    <tbody>
                      <tr>
                        <th>Account</th>
                        <th>Debit</th>
                        <th>Credit</th>
                      </tr>
                      <tr>
                        <td>Cash</td>
                        <td>1000</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Service Revenue</td>
                        <td></td>
                        <td>1000</td>
                      </tr>
                    </tbody>
                  </table>
                `}
              />
            </div>
          </div>

          <button className="rounded-lg bg-slate-900 px-5 py-2 text-white">
            Save Lesson
          </button>
        </form>
      </div>
    </main>
  );
}