"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Project } from "@prisma/client";
import { projectSchema } from "@/lib/schema";

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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, Pencil } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProject } from "@/app/actions/projectActions";

interface EditProjectProps {
    project: Project;
    setOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProject: React.FC<EditProjectProps> = ({ project, setOptionsOpen }) => {
    const router = useRouter();

    const [editingProject, setEditingProject] = React.useState(false);
    const [editFormOpen, setEditFormOpen] = React.useState(false);

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectTitle: project.title,
            projectURL: project.url,
            projectDescription: project.description,
        },
    });

    const editProjectMutation = useMutation({
        mutationFn: editProject,
        onSuccess: (data) => {
            //console.log(data);

            queryClient.invalidateQueries({ queryKey: ["projects"], exact: true });

            setEditingProject(false);
            setEditFormOpen(false); 
            setOptionsOpen(false);
        },
        onError: (error) => {
            console.error("[EditProjectComponent] Error editing project:", error);

            setEditingProject(false);
        },
        onSettled: () => {
            form.reset();
            router.refresh();
        },
    })

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
        //console.log(values);
        setEditingProject(true);
        editProjectMutation.mutate({
            projectId: project.id,
            project: values
        });   
    }


    return (
        <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
            <DialogTrigger className="w-full" asChild>
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    setEditFormOpen(true);
                }} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="bg-zinc-100 rounded-2xl sm:rounded-2xl">
                <DialogHeader className="px-2 sm:px-0">
                    <DialogTitle className="text-neutral-800 text-xl md:text-2xl">
                        Edit Project
                    </DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        Edit the details of your project
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
                                disabled={editingProject}
                                className="rounded-full md:rounded-3xl bg-blue-600 hover:bg-blue-700"
                            >
                                {editingProject ? (
                                    <Loader2 style={{ width: "1rem", height: "1rem" }} className="mr-0 animate-spin" />
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProject;
