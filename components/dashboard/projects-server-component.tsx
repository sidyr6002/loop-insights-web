import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { getAllProjects } from "@/app/actions/projectActions";
import Projects from "@/components/dashboard/projects";
import { Project } from "@prisma/client";

const ProjectsServerComponent = () => {
    const queryClient = new QueryClient();
    
    queryClient.prefetchQuery<{ hasSubscription: boolean; projects: Project[] }>({
        queryKey: ["projects"],
        queryFn: async () => {
            const data = await getAllProjects();
            return data;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Projects />
        </HydrationBoundary>
    );
};

export default ProjectsServerComponent;
