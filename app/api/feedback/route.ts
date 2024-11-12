import prisma from "@/lib/prisma";
import { Feedback } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return Response.json({ message: "Hello, Next.js!" });
}

export async function POST(request: NextRequest) {
    const { userName, userEmail, rating, feedback, projectId }: Feedback =
        await request.json();

    console.log(userName, userEmail, rating, feedback, projectId);

    try {
        const validProjectId = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!validProjectId) {
            return new NextResponse(JSON.stringify({ error: "Project not found" }), { status: 404 });
        }

        const newFeedback = await prisma.feedback.create({
            data: {
                userName,
                userEmail,
                rating,
                feedback,
                projectId,
            },
        });

        return new NextResponse(JSON.stringify(newFeedback), { status: 201 });
    } catch (error) {
        console.error("[POST /api/feedback] Error creating feedback:", error);

        return new NextResponse( JSON.stringify({ error: "Failed to create feedback" }), { status: 500 });
    }
}
