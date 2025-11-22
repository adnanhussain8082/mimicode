"use client";

import { useState } from "react";
import ProjectForm from "@/modules/home/ui/components/ProjectForm";
import ProjectsList from "@/modules/home/ui/components/ProjectsList";
import Image from "next/image";

function HomePage() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src={'/logo.svg'}
            alt="Promptly"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Build something with promptly
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create apps and websites by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm onSubmit={() => setHasSubmitted(true)} />
        </div>
      </section>
      {!hasSubmitted && <ProjectsList />}
    </div>
  );
}

export default HomePage;