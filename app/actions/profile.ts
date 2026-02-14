"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const resume = formData.get("resume") as string;

    // Assuming single user for now, fetch first or create
    const existing = await prisma.userProfile.findFirst();

    if (existing) {
        await prisma.userProfile.update({
            where: { id: existing.id },
            data: { baseResume: resume },
        });
    } else {
        await prisma.userProfile.create({
            data: { baseResume: resume },
        });
    }

    revalidatePath("/profile");
}
