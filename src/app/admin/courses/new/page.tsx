import { createCourse } from "../actions";

export default function NewCoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Create Course</h1>

        <form action={createCourse} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Course Title</label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="Accounting Basics Mastery"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              className="mt-1 w-full rounded-lg border p-3"
              rows={5}
              placeholder="Learn accounting from debit and credit to financial statements."
            />
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="published" />
            Publish now
          </label>

          <button className="rounded-lg bg-slate-900 px-5 py-2 text-white">
            Save Course
          </button>
        </form>
      </div>
    </main>
  );
}