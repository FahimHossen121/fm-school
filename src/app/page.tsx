import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Topics from "@/components/Topics";

const page = () => {
  return (
    <main>
      <Navbar />
      <Topics />
      <Hero />
      <Courses />
    </main>
  );
};
export default page;
