import { MarkdownWorkspace } from "@/components/markdown-editor/MarkdownWorkspace";
import { File } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <header className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1">
            <File size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Readme Canvas</h1>
        </div>
      </header>
      
      <MarkdownWorkspace />
    </main>
  );
}
