"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";

export default function Researchers() {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionLabel number="VII" title="The Researchers" />

        <h2 className="text-3xl md:text-4xl font-bold text-forest leading-tight mb-4">
          About the team
        </h2>
        <p className="text-lg text-text-light max-w-3xl mb-12 leading-relaxed">
          This research was conducted by undergraduate students at the London
          School of Economics and Political Science as part of the LSE100
          programme, demonstrating the calibre of student-led policy research.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Researcher 1",
            "Researcher 2",
            "Researcher 3",
            "Researcher 4",
          ].map((name, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.1}
              className="bg-forest-dark/5 rounded-xl p-6 text-center border border-forest/10"
            >
              <div className="w-20 h-20 bg-forest/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-forest/30">
                  {name.split(" ")[1]}
                </span>
              </div>
              <h3 className="font-semibold text-forest">{name}</h3>
              <p className="text-sm text-text-light mt-1">
                LSE Undergraduate
              </p>
            </AnimatedSection>
          ))}
        </div>

        <p className="text-center text-sm text-text-muted mt-8">
          Names and photos to be added with student permission.
        </p>
      </AnimatedSection>
    </div>
  );
}
