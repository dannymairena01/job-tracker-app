import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { JobDetailView } from "@/components/JobDetailView";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = await prisma.jobApplication.findUnique({
        where: { id },
    });

    if (!job) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold">Job Not Found</h1>
                <p>The job application you are looking for does not exist.</p>
            </div>
        );
    }

    return <JobDetailView job={job} />;
}
