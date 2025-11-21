import ProjectView from "@/modules/projects/ui/views/ProjectView"; 
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ projectId: string }>;
}

async function ProjectPage({ params }: Props) {
  const { projectId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  );
  try {
    void queryClient.prefetchQuery(
      trpc.projects.getOne.queryOptions({
        id: projectId,
      })
    );
  } catch (err: any) {
    // If the project is not found, render a simple not-found UI
    if (err?.code === "NOT_FOUND" || err?.message?.includes("Project not found")) {
      return <div className="p-4">Project not found</div>;
    }
    throw err;
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectView projectId={projectId}></ProjectView>
      </Suspense>{" "}
    </HydrationBoundary>
  );
}
export default ProjectPage;