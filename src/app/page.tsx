export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl font-bold">
          Abella Accounting Academy
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Learn accounting, QuickBooks, Excel, payroll, tax basics, and business finance through practical lessons and exercises.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/courses"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-950"
          >
            Browse Courses
          </a>

          <a
            href="/admin"
            className="rounded-lg border border-white/30 px-5 py-3 font-semibold"
          >
            Admin Portal
          </a>
        </div>
      </section>
    </main>
  );
}