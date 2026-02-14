"use client";

import { Button } from "@/components/ui/button";
import { seedProfile, seedJob } from "@/app/actions/test";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function TestPage() {
    const [profileStatus, setProfileStatus] = useState("");
    const [jobStatus, setJobStatus] = useState("");

    const handleSeedProfile = async () => {
        setProfileStatus("Seeding...");
        await seedProfile();
        setProfileStatus("Done! ✅");
        setTimeout(() => setProfileStatus(""), 3000);
    };

    const handleSeedJob = async () => {
        setJobStatus("Seeding...");
        await seedJob();
        setJobStatus("Done! ✅");
        setTimeout(() => setJobStatus(""), 3000);
    };

    return (
        <main className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                <Link href="/" className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">Test Utility</h1>
                    <p className="text-white/50">Quickly populate data for testing.</p>
                </div>

                <div className="glass-card rounded-2xl p-8 border-white/5 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">1. Seed Profile</h3>
                                <p className="text-sm text-white/40">Adds a sample designer resume.</p>
                            </div>
                            <Button
                                onClick={handleSeedProfile}
                                className="bg-white text-black hover:bg-white/90 min-w-[100px]"
                                disabled={profileStatus === "Seeding..."}
                            >
                                {profileStatus || "Run"}
                            </Button>
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">2. Seed Job</h3>
                                <p className="text-sm text-white/40">Adds an Airbnb job listing.</p>
                            </div>
                            <Button
                                onClick={handleSeedJob}
                                className="bg-white text-black hover:bg-white/90 min-w-[100px]"
                                disabled={jobStatus === "Seeding..."}
                            >
                                {jobStatus || "Run"}
                            </Button>
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-red-400 font-medium">3. Reset Data (Demo Mode)</h3>
                                <p className="text-sm text-white/40">Clears ALL data for a fresh start.</p>
                            </div>
                            <Button
                                onClick={async () => {
                                    if (!confirm("⚠️ Are you sure? This deletes ALL data for a fresh demo.")) return;
                                    await import("@/app/actions/test").then(m => m.resetData());
                                    alert("Data cleared! Ready for demo.");
                                }}
                                className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 min-w-[100px]"
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-white/30">
                    <p>After running these, go back to Dashboard to see changes.</p>
                </div>
            </div>
        </main>
    );
}
