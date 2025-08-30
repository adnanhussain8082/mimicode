import { Suspense } from "react";
import { getQueryClient , trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";


const Page = async () => {
  
  // const data = await caller.createAI({text: "Adnan SERVER"});
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["createAI", { text: "Adnan PREFETCH" }],
    queryFn: () => trpc.createAI({ text: "Adnan PREFETCH" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <Client />
      </Suspense>

    </HydrationBoundary>
  );
}

export default Page