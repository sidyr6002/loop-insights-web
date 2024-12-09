import prisma from "@/lib/prisma";
import { Feedback } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
  
export async function GET() {
    return Response.json({ message: "Hello, Next.js!" });
}

export async function POST(request: NextRequest) {
    const { userName, userEmail, rating, feedback, projectId }: Feedback =
        await request.json();

    console.log(userName, userEmail, rating, feedback, projectId);

    if (!userName || !userEmail || !rating || !feedback || !projectId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };    

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

        return NextResponse.json(newFeedback, { status: 201, headers });
    } catch (error) {
        console.error("[POST /api/feedback] Error creating feedback:", error);

        return NextResponse.json({ error: "Failed to create feedback" }, { status: 500, headers });
    }
}
