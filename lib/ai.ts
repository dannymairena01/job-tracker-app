import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

const JobParsingSchema = z.object({
    company: z.string().default("Unknown"),
    role: z.string().default("Unknown Role"),
    summary: z.string().default("No summary available"),
    skills: z.array(z.string()).default([]),
    salary: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
});

export type JobParsingResult = z.infer<typeof JobParsingSchema>;

export async function parseJobDescription(text: string): Promise<JobParsingResult | null> {
    try {
        console.log("Parsing job description length:", text.length);
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert job market analyst. Extract structured information from the provided job description text. Return JSON.",
                },
                {
                    role: "user",
                    content: `Extract the following fields from the text:
          - company: Company name (infer if not explicit, or "Unknown")
          - role: Job title
          - summary: Brief summary of the role (2-3 sentences)
          - skills: Array of key skills/technologies mentioned
          - salary: Salary range if mentioned, else null
          - location: Location if mentioned, else null
          
          Job Description:
          ${text}`,
                },
            ],
            response_format: { type: "json_object" },
        });

        const content = response.choices[0].message.content;
        console.log("OpenAI Response Content:", content);

        if (!content) return null;

        const parsed = JSON.parse(content);
        return JobParsingSchema.parse(parsed);
    } catch (error) {
        console.error("Error parsing job description:", error);
        return null;
    }
}

export async function generateCoverLetter(jobDescription: string, userResume: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a professional career coach. Write a tailored cover letter.",
                },
                {
                    role: "user",
                    content: `Write a professional cover letter for the following job, based on the candidate's resume.
          
          Job Description:
          ${jobDescription}
          
          Candidate Resume:
          ${userResume}
          `,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating cover letter:", error);
        return null;
    }
}

export async function generateTailoredResume(jobDescription: string, userResume: string) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer. Rewrite the candidate's resume to highlight skills and experience relevant to the job description. Keep the same structure but reorder bullet points and emphasize keywords.",
                },
                {
                    role: "user",
                    content: `Tailor this resume for the following job.
          
          Job Description:
          ${jobDescription}
          
          Candidate Resume:
          ${userResume}
          `,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating tailored resume:", error);
        return null;
    }
}
