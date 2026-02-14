"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function seedProfile() {
    const sampleResume = `Jane Doe
Senior Product Designer
5+ years of experience designing mobile and web applications.
Skills: Figma, React, User Research, Prototyping, Design Systems.
Experience:
- Lead Designer at StartupX (2020-Present): Led redesign of core mobile app, increasing retention by 20%.
- UI Designer at AgencyY (2018-2020): Designed marketing websites for Fortune 500 clients.`;

    const existing = await prisma.userProfile.findFirst();

    if (existing) {
        await prisma.userProfile.update({
            where: { id: existing.id },
            data: { baseResume: sampleResume },
        });
    } else {
        await prisma.userProfile.create({
            data: { baseResume: sampleResume },
        });
    }

    revalidatePath("/profile");
    return { success: true, message: "Profile seeded successfully!" };
}

export async function seedJob() {
    const description = `Role: Senior Product Designer
Company: Airbnb
Location: Remote

About the Role:
We are looking for a Senior Product Designer to join our Core Experience team. You will be responsible for defining the future of our host and guest experiences.

Requirements:
- 5+ years of product design experience.
- Proficiency with Figma and prototyping tools.
- Experience working with design systems.
- Strong portfolio demonstrating critical thinking.`;

    const analysis = JSON.stringify({
        role: "Senior Product Designer",
        company: "Airbnb",
        skills: ["Product Design", "Figma", "Prototyping", "Design Systems"],
        summary: "The role involves defining the future of host and guest experiences at Airbnb. Key responsibilities include product design and working with design systems."
    });

    await prisma.jobApplication.create({
        data: {
            company: "Airbnb",
            role: "Senior Product Designer",
            jobUrl: "https://airbnb.com/careers",
            description: description,
            status: "SAVED",
            analysis: analysis,
        },
    });

    revalidatePath("/");
    return { success: true, message: "Job seeded successfully!" };
}

export async function resetData() {
    await prisma.jobApplication.deleteMany({});
    // Optional: keep profile or delete it? For a demo, keeping profile might be better, 
    // but a full reset should probably clear everything or at least jobs.
    // Let's clear jobs only for now so they don't lose their resume setting, 
    // or maybe clear both if they want a FULL fresh start. 
    // Actually, let's clear both to be safe for a "Fresh Start".
    // Wait, user might want to keep the resume. 
    // Let's just delete jobs for the "Reset Dashboard" feel.
    // Actually, let's delete both so they can show the "Empty State".
    await prisma.userProfile.deleteMany({});

    revalidatePath("/");
    revalidatePath("/profile");
    return { success: true, message: "Data reset successfully!" };
}
