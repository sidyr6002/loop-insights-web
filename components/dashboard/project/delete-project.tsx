'use client';

import { useState } from "react";
import { Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "@/app/actions/projectActions";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Loader2, Trash2 } from "lucide-react";

interface DeleteProjectProps {
	project: Project,
	setOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ project, setOptionsOpen }) => {
	const [deletingProject, setDeletingProject] = useState(false);
	const [deleteFormOpen, setDeleteFormOpen] = useState(false);

	const queryClient = useQueryClient();

	const deleteProjectMutation = useMutation({
		mutationFn: deleteProject,
		onSuccess: (data) => {
			console.log("[DeleteProjectComponent] Success: ", data);

			queryClient.invalidateQueries({ queryKey: ["projects"], exact: true });

			setDeletingProject(false);
			setDeleteFormOpen(false); 
			setOptionsOpen(false);
		},
		onError: (error) => {
			console.log("[DeleteProjectComponent] Error: ", error);

			setDeletingProject(false);
		},
	});

	const handleCancel = () => {
		setDeleteFormOpen(false);
		setOptionsOpen(false);
	};

	const handleDelete = () => {
		setDeletingProject(true);
		deleteProjectMutation.mutate(
			project.id
		);
	};

  return (
    <Dialog open={deleteFormOpen} onOpenChange={setDeleteFormOpen}>
            <DialogTrigger className="w-full" asChild>
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
					setDeleteFormOpen(true);
                }} className="cursor-pointer text-red-600 focus:text-red-600/90">
                    <Trash2 className="mr-2 h-4 w-4" />
					Delete
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="bg-zinc-100 rounded-2xl sm:rounded-2xl px-4 sm:px-6 lg:px-8">
                <DialogHeader className="py-4 sm:px-0">
                    <DialogTitle className="text-neutral-800 text-xl sm:text-2xl">
                        Delete Project
                    </DialogTitle>
                    <DialogDescription className="text-xs md:text-sm">
                        You are about to delete this project. This action is irreversible.
                    </DialogDescription>
                </DialogHeader>
					<DialogFooter className="mt-4">
						<div className="flex flex-col sm:flex-row items-center gap-4">
							<Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>
								Cancel
							</Button>
							<Button variant="destructive" className="w-full rounded-full" onClick={handleDelete}>
								{deletingProject ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : "Delete"}
							</Button>
						</div>
					</DialogFooter>
				
            </DialogContent>
        </Dialog>
  )
}

export default DeleteProject