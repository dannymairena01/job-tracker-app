"use client";

import { createJob } from "@/app/actions/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full bg-white text-black hover:bg-white/90 font-medium transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Analyzing...
                </span>
            ) : "Add Job Application"}
        </Button>
    );
}

export function AddJobForm() {
    return (
        <form action={createJob} className="space-y-4">
            <div className="space-y-2">
                <Input
                    name="url"
                    placeholder="Job URL (optional)"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20 focus-visible:border-white/20"
                />
            </div>
            <div className="space-y-2">
                <Textarea
                    name="text"
                    placeholder="Paste Job Description here..."
                    required
                    className="h-48 bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none focus-visible:ring-white/20 focus-visible:border-white/20"
                />
            </div>
            <SubmitButton />
        </form>
    );
}
