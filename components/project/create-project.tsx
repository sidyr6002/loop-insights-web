"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { addProject } from "@/app/actions/productActions";

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, Plus } from "lucide-react";


const CreateProjectButton = () => {
    const router = useRouter();
    const [creatingProject, setCreatingProject] = React.useState(false);

    // console.log("User", user);

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectTitle: "",
            projectURL: "",
            projectDescription: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
        setCreatingProject(true);

        try {
            const result = await addProject(values);

            if (result.error) {
                console.error(result.error);
            }

            const project = result.data;

            if (!project) {
                throw new Error("Something went wrong in creating project.");
            }

            setCreatingProject(false);
            form.reset();
            router.push(`/projects/${project.id}/instructions`);
        }
        catch (error) {
            console.error("[CreateProjectButton] Error: ", error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="p-2 sm:px-4 lg:px-5 lg:py-0 flex items-center rounded-full text-blue-600 bg-zinc-100 hover:bg-zinc-200 transition duration-150"
                >
                        <Plus style={{width: "1.2rem", height: "1.2rem"}} />
                        <span className="hidden sm:block text-xs lg:text-sm font-medium">
                            Project
                        </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-100 rounded-2xl sm:rounded-2xl">
                <DialogHeader className="px-2 sm:px-0">
                    <DialogTitle className="text-neutral-800 text-xl md:text-2xl">
                        Create Project
                    </DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Fill in the form below to create a new project
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 px-2 py-3 sm:px-3 sm:py-4"
                    >
                        <div className="sm:grid sm:grid-cols-2 space-y-4 sm:space-y-0 sm:space-x-4">
                            <FormField
                                control={form.control}
                                name="projectTitle"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-2">
                                        <FormLabel className="text-xs font-semibold text-stone-600/90">
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="My New Project"
                                                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[11px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectURL"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-2">
                                        <FormLabel className="text-xs font-semibold text-stone-600/90">
                                            URL
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://example.com"
                                                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[11px]" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="projectDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-2">
                                    <FormLabel className="text-xs font-semibold text-stone-600/90">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Description"
                                            className="resize-none rounded-2xl focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[11px]" />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4 lg:pt-2">
                            <Button
                                type="submit"
                                disabled={creatingProject}
                                className="rounded-full md:rounded-3xl bg-blue-600 hover:bg-blue-700"
                            >
                                {creatingProject ? (
                                    <Loader2 style={{ width: "1rem", height: "1rem" }} className="mr-0 animate-spin" />
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectButton;
