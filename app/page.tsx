import { PlateEditor } from "@/components/editor/plate-editor";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="h-screen w-full px-20 py-8">
      <PlateEditor />

      <Toaster />
    </div>
  );
}
