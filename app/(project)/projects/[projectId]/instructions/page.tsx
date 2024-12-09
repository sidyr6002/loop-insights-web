"use client";

import React from "react";
import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import CopyButton from "@/components/copy-button";

import { BookOpen, ChevronLeft, Code, Palette } from "lucide-react";
import Link from "next/link";

if (!process.env.NEXT_PUBLIC_FEEDBACK_URL) {
    throw new Error("Missing NEXT_PUBLIC_FEEDBACK_URL");
}

console.log("[ProjectInstructionsPage] NEXT_PUBLIC_FEEDBACK_URL: ", process.env.NEXT_PUBLIC_FEEDBACK_URL);

const buildScript = ({ projectId }: { projectId: string | string[] }) => {
    return {
        element: `<feedback-element project-id="${projectId}" label={YOUR_LABEL}></feedback-element>`,
        umd: `<script src="${process.env.NEXT_PUBLIC_FEEDBACK_URL}/feedback.umd.js"></script>`,
    }
}

const ProjectInstructionsPage = () => {
    const { projectId } = useParams();
    
    if (!projectId) {
        return <div>Project not found</div>
    }

    const script = buildScript({ projectId })

    return (
        <div className="w-full my-8 max-w-6xl mx-auto px-2 sm:px-4 pb-8">
            <div className="mb-8">
                <Link href={`/projects/${projectId}`} className="flex items-center gap-1 text-blue-700"><ChevronLeft className="w-4 h-4" /> Back to Project</Link>
            </div>
            {/* Title Section with gradient background */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 p-8 mb-8">
                <div className="relative z-10">
                    <div className="flex items-center space-x-3">
                        <BookOpen className="w-8 h-8 text-white" />
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                            Instructions
                        </h2>
                    </div>
                    <p className="mt-4 text-blue-100 max-w-2xl">
                        Get started with implementing feedback collection in
                        your project. Follow our simple step-by-step guide
                        below.
                    </p>
                </div>
                {/* Decorative pattern */}
                <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4">
                    <div className="w-64 h-64 rounded-full bg-white/10" />
                </div>
            </div>

            <Card className="w-full bg-white rounded-2xl shadow-lg">
                <CardContent className="p-8">
                    {/* Introduction */}
                    <div className="mb-12">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Start Collecting Feedback
                        </h3>
                        <p className="text-gray-600 text-lg">
                            Integrating feedback collection into your project is
                            quick and easy. Follow the steps below to get
                            started.
                        </p>
                    </div>

                    {/* Steps Container */}
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Code className="w-5 h-5 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Step 1: Add the Script or Component
                                </h4>
                            </div>

                            {/* Implementation Options */}
                            <div className="grid gap-8">
                                {/* React/Next.js Option */}
                                

                                {/* HTML/JS Option */}
                                <div className="space-y-4 flex flex-col">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        Add the following code to your HTML:
                                    </h5>
                                    <div className="flex-grow flex justify-between items-center gap-2 bg-gray-50 p-4 pr-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                        <code className=" text-blue-600 font-mono text-sm break-all">
                                            {script.element}
                                            <br />
                                            {script.umd}
                                        </code>
                                        <CopyButton
                                            text={script.element + "\n" + script.umd}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Palette className="w-5 h-5 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Step 2: Customize as Needed
                                </h4>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <p className="text-gray-700">
                                    Once you&apos;ve added the code, the feedback
                                    form will automatically be integrated into
                                    your project. You can customize the
                                    appearance and behavior by adjusting the
                                    component settings or applying your own CSS
                                    styles.
                                </p>
                            </div>
                        </div>

                        {/* Final Section */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
                            <h5 className="text-xl font-bold text-gray-900 mb-4">
                                That&apos;s It! 🎉
                            </h5>
                            <p className="text-gray-700">
                                You&apos;re all set to start collecting valuable
                                feedback from your users. If you need additional
                                customization options or encounter any issues,
                                please refer to our documentation or contact our
                                support team.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectInstructionsPage;
