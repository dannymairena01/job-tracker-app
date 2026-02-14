import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/ProfileForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
    const profile = await prisma.userProfile.findFirst();

    return (
        <main className="min-h-screen p-4 md:p-8 relative overflow-hidden flex justify-center">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-2xl space-y-8 relative z-10 pt-12">
                <Link href="/" className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
                    <p className="text-white/50">Manage your base resume for AI customizations.</p>
                </div>

                <div className="glass-card rounded-2xl p-8 border-white/5">
                    <h2 className="text-xl font-semibold mb-2 text-white">Base Resume</h2>
                    <p className="text-sm text-white/40 mb-6">
                        Paste your full resume text here. The AI will use this context when generating targeted cover letters.
                    </p>

                    <ProfileForm initialResume={profile?.baseResume || ""} />
                </div>
            </div>
        </main>
    );
}
