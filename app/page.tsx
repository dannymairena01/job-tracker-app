import { prisma } from "@/lib/prisma";
import { AddJobForm } from "@/components/AddJobForm";
import { JobCard } from "@/components/JobCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const jobs = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <header className="mb-12 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
          <span className="px-3 py-1 text-xs font-medium text-white/70">✨ AI-Powered Tracking</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-4">
          Job Application Tracker
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto mb-6">
          Streamline your job search with intelligent parsing and automated organization.
        </p>

        <Link href="/profile">
          <Button variant="outline" className="border-white/10 text-white bg-white/5 hover:bg-white/10 hover:text-white transition-all">
            Manage Profile
          </Button>
        </Link>
      </header>

      <div className="w-full max-w-6xl grid gap-8 md:grid-cols-[400px_1fr] items-start relative z-10">
        <aside className="sticky top-8">
          <div className="glass-card rounded-2xl p-6 border-white/5">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-white/20 rounded-full" />
              Add New Application
            </h2>
            <AddJobForm />
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Your Applications</h2>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/60">
              {jobs.length} Total
            </div>
          </div>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {jobs.length === 0 && (
              <div className="glass-card rounded-2xl p-12 text-center border-dashed border-white/10">
                <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No applications yet</h3>
                <p className="text-white/40">Use the form on the left to track your first job.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
