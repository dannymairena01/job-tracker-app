"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/app/actions/profile";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ProfileForm({ initialResume }: { initialResume: string }) {
    const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");

    const handleSubmit = async (formData: FormData) => {
        setStatus("saving");
        await updateProfile(formData);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            <Textarea
                name="resume"
                defaultValue={initialResume}
                placeholder="Paste your resume content here..."
                className="min-h-[400px] font-mono text-sm bg-white/5 border-white/10 text-white/80 placeholder:text-white/20 focus-visible:ring-white/20 focus-visible:border-white/20 resize-none p-4"
            />
            <div className="flex justify-end items-center gap-4">
                {status === "success" && (
                    <span className="text-green-400 flex items-center gap-2 text-sm animate-in fade-in slide-in-from-right-4">
                        <CheckCircle2 className="w-4 h-4" />
                        Saved successfully!
                    </span>
                )}
                <Button
                    type="submit"
                    className="bg-white text-black hover:bg-white/90 min-w-[120px]"
                    disabled={status === "saving"}
                >
                    {status === "saving" ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
