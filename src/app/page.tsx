import { Afterform } from "@/components/Afterform";
import { BrandNav } from "@/components/BrandNav";
import { ScrollTheater } from "@/components/ScrollTheater";

export default function Page() {
  return (
    <main id="top">
      <BrandNav />
      <ScrollTheater />
      <Afterform />
    </main>
  );
}
