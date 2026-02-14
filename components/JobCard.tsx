import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteJob } from "@/app/actions/jobs";
import { JobApplication } from "@prisma/client";
import Link from "next/link";

export function JobCard({ job }: { job: JobApplication }) {
    // Parsing analysis JSON if available
    let skills: string[] = [];
    try {
        if (job.analysis) {
            const parsed = JSON.parse(job.analysis);
            skills = parsed.skills || [];
        }
    } catch (e) { }

    return (
        <div className="glass-card rounded-xl overflow-hidden transition-all hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">{job.role}</h3>
                        <p className="text-sm text-white/50">{job.company}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${job.status === "APPLIED"
                        ? "bg-green-500/10 border-green-500/20 text-green-200"
                        : "bg-white/5 border-white/10 text-white/60"
                        }`}>
                        {job.status}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.slice(0, 3).map((skill: string) => (
                        <span key={skill} className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/70 border border-white/5">
                            {skill}
                        </span>
                    ))}
                    {skills.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/40 border border-white/5">
                            +{skills.length - 3}
                        </span>
                    )}
                </div>

                <p className="text-sm text-white/40 line-clamp-2 mb-6 min-h-[2.5rem]">
                    {job.description}
                </p>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <form action={deleteJob.bind(null, job.id)}>
                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded hover:bg-red-500/10">
                            Delete
                        </button>
                    </form>
                    <Link href={`/jobs/${job.id}`}>
                        <button className="text-xs text-white bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-1.5 rounded transition-all">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
