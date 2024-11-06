import { z } from "zod";

export const projectSchema = z
    .object({
        projectTitle: z.string().min(2, {
            message: "Project name must be at least 2 characters.",
        }),
        projectURL: z.string().url({
            message: "Please enter a valid URL.",
        }),
        projectDescription: z.string().min(2, {
            message: "Description must be at least 2 characters.",
        }),
    })
    .refine(
        (data) => {
            return (
                data.projectURL.startsWith("http://") ||
                data.projectURL.startsWith("https://")
            );
        },
        {
            message: "URL must start with http:// or https://",
            path: ["projectURL"],
        }
    );
