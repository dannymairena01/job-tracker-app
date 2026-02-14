"use server";

import { prisma } from "@/lib/prisma";
import { parseJobDescription, generateCoverLetter, generateTailoredResume } from "@/lib/ai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
    const url = formData.get("url") as string;
    const text = formData.get("text") as string;

    let description = text;
    let company = "Unknown";
    let role = "Unknown Role";
    let analysis = null;

    if (text) {
        const parsed = await parseJobDescription(text);
        if (parsed) {
            company = parsed.company;
            role = parsed.role;
            description = text;
            analysis = JSON.stringify(parsed);
        }
    }

    await prisma.jobApplication.create({
        data: {
            company,
            role,
            jobUrl: url || "",
            description,
            status: "SAVED",
            analysis: analysis || "",
        },
    });

    revalidatePath("/");
    redirect("/");
}

export async function deleteJob(id: string) {
    await prisma.jobApplication.delete({
        where: { id },
    });
    revalidatePath("/");
    redirect("/");
}

export async function updateJobStatus(id: string, status: string) {
    await prisma.jobApplication.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/");
    revalidatePath(`/jobs/${id}`);
}

export async function generateCoverLetterAction(jobId: string) {
    const job = await prisma.jobApplication.findUnique({ where: { id: jobId } });
    if (!job || !job.description) return;

    const profile = await prisma.userProfile.findFirst();
    const userResume = profile?.baseResume || "No resume provided.";

    const letter = await generateCoverLetter(job.description, userResume);

    if (letter) {
        await prisma.jobApplication.update({
            where: { id: jobId },
            data: { coverLetter: letter },
        });
        revalidatePath(`/jobs/${jobId}`);
    }
}

export async function generateResumeAction(jobId: string) {
    const job = await prisma.jobApplication.findUnique({ where: { id: jobId } });
    if (!job || !job.description) return;

    const profile = await prisma.userProfile.findFirst();
    const userResume = profile?.baseResume || "No resume provided.";

    const resume = await generateTailoredResume(job.description, userResume);

    if (resume) {
        await prisma.jobApplication.update({
            where: { id: jobId },
            data: { customResume: resume },
        });
        revalidatePath(`/jobs/${jobId}`);
    }
}
