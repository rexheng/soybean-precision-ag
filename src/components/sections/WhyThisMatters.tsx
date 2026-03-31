"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";

export default function WhyThisMatters() {
  return (
    <div className="bg-forest-dark text-cream py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionLabel number="VI" title="Why This Matters" />

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 max-w-3xl">
            Student research with{" "}
            <span className="text-soybean">real-world impact potential</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-cream/80 leading-relaxed">
                This isn&apos;t a theoretical exercise. The strategy outlined
                here builds on{" "}
                <strong className="text-cream">proven technology</strong>,
                real pilot data from Mato Grosso, and aligns with existing
                corporate and governmental commitments.
              </p>
              <p className="text-lg text-cream/80 leading-relaxed">
                The success of this programme in Brazil could serve as a{" "}
                <strong className="text-cream">
                  model for other countries
                </strong>{" "}
                facing similar deforestation challenges — Argentina, Paraguay,
                and beyond. It could also be replicated across other sectors:
                livestock, poultry, and palm oil.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-6">
                <p className="font-mono text-xs tracking-widest uppercase text-soybean mb-3">
                  Scalable Impact
                </p>
                <p className="text-cream/70 leading-relaxed">
                  By reducing deforestation across Brazil&apos;s agricultural
                  frontier, this approach contributes directly to{" "}
                  <strong className="text-cream">
                    global climate change mitigation
                  </strong>
                  . The Cerrado and Amazon together represent one of the
                  planet&apos;s most critical carbon sinks.
                </p>
              </div>

              <div className="bg-cream/5 border border-cream/10 rounded-xl p-6">
                <p className="font-mono text-xs tracking-widest uppercase text-soybean mb-3">
                  Evidence-Based
                </p>
                <p className="text-cream/70 leading-relaxed">
                  Grounded in <strong className="text-cream">40+</strong>{" "}
                  academic and industry sources, Ostrom&apos;s commons
                  framework, Lewin&apos;s force field analysis, and Meadows&apos;
                  leverage point theory. This is rigorous policy design.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
