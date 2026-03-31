import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import PolicyProposal from "@/components/sections/PolicyProposal";
import PrecisionAg from "@/components/sections/PrecisionAg";
import Challenges from "@/components/sections/Challenges";
import ActionPlan from "@/components/sections/ActionPlan";
import WhyThisMatters from "@/components/sections/WhyThisMatters";
import Researchers from "@/components/sections/Researchers";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <PolicyProposal />
      <PrecisionAg />
      <Challenges />
      <ActionPlan />
      <WhyThisMatters />
      <Researchers />
      <Footer />
    </main>
  );
}
