"use client";

import { JobApplication } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateJobStatus, deleteJob, generateCoverLetterAction, generateResumeAction } from "@/app/actions/jobs";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Trash2 } from "lucide-react";

export function JobDetailView({ job }: { job: JobApplication }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingResume, setIsGeneratingResume] = useState(false);

    // Parse analysis safely
    let analysis: any = {};
    try {
        if (job.analysis) analysis = JSON.parse(job.analysis);
    } catch (e) { }

    const handleGenerateCoverLetter = async () => {
        setIsGenerating(true);
        try {
            await generateCoverLetterAction(job.id);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateResume = async () => {
        setIsGeneratingResume(true);
        try {
            await generateResumeAction(job.id);
        } finally {
            setIsGeneratingResume(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 relative">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
                <Link href="/" className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{job.role}</h1>
                        <p className="text-2xl text-white/60">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`px-4 py-1.5 rounded-full text-sm font-medium border ${job.status === "APPLIED"
                            ? "bg-green-500/10 border-green-500/20 text-green-200"
                            : "bg-white/5 border-white/10 text-white/60"
                            }`}>
                            {job.status}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_350px]">
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="glass-card rounded-2xl p-6 border-white/5">
                            <h2 className="text-lg font-semibold text-white mb-4">Role Analysis</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-white/50 mb-3 uppercase tracking-wider">Key Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.skills?.map((skill: string) => (
                                            <span key={skill} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm text-white/80">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-white/50 mb-2 uppercase tracking-wider">Summary</h3>
                                    <p className="text-white/70 leading-relaxed">{analysis.summary || "No summary available."}</p>
                                </div>
                            </div>
                        </div>

                        {/* Cover Letter Section */}
                        {(job.coverLetter || isGenerating) && (
                            <div className="glass-card rounded-2xl p-8 border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-1 h-6 bg-purple-400 rounded-full" />
                                        Cover Letter
                                    </h2>
                                    {isGenerating && <span className="text-sm text-purple-300 animate-pulse">Generating magic...</span>}
                                </div>

                                {job.coverLetter ? (
                                    <pre className="whitespace-pre-wrap font-sans text-white/80 leading-7 bg-black/20 p-6 rounded-xl border border-white/5">
                                        {job.coverLetter}
                                    </pre>
                                ) : (
                                    <div className="h-64 flex items-center justify-center text-white/20">
                                        <div className="animate-pulse">Writing your letter...</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tailored Resume Section */}
                        {(job.customResume || isGeneratingResume) && (
                            <div className="glass-card rounded-2xl p-8 border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-1 h-6 bg-blue-400 rounded-full" />
                                        Tailored Resume
                                    </h2>
                                    {isGeneratingResume && <span className="text-sm text-blue-300 animate-pulse">Tailoring resume...</span>}
                                </div>

                                {job.customResume ? (
                                    <pre className="whitespace-pre-wrap font-sans text-white/80 leading-7 bg-black/20 p-6 rounded-xl border border-white/5">
                                        {job.customResume}
                                    </pre>
                                ) : (
                                    <div className="h-64 flex items-center justify-center text-white/20">
                                        <div className="animate-pulse">Optimizing your resume...</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Original Job Description */}
                        <div className="glass-card rounded-2xl p-6 border-white/5">
                            <h2 className="text-lg font-semibold text-white mb-4">Original Description</h2>
                            <pre className="whitespace-pre-wrap text-sm text-white/40 max-h-96 overflow-y-auto font-sans leading-relaxed">
                                {job.description}
                            </pre>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card rounded-2xl p-6 border-white/5 sticky top-8">
                            <h2 className="text-lg font-semibold text-white mb-6">Actions</h2>
                            <div className="space-y-4">
                                <Button
                                    className="w-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
                                    onClick={handleGenerateCoverLetter}
                                    disabled={isGenerating || !!job.coverLetter}
                                >
                                    {isGenerating ? "Generating..." : job.coverLetter ? "Regenerate Letter" : "✨ Generate Cover Letter"}
                                </Button>

                                <Button
                                    className="w-full text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
                                    onClick={handleGenerateResume}
                                    disabled={isGeneratingResume || !!job.customResume}
                                >
                                    {isGeneratingResume ? "Tailoring..." : job.customResume ? "Regenerate Resume" : "📄 Generate Resume"}
                                </Button>

                                <div className="h-px bg-white/10 my-4" />

                                <form action={deleteJob.bind(null, job.id)}>
                                    <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2 justify-start">
                                        <Trash2 className="w-4 h-4" />
                                        Delete Application
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
