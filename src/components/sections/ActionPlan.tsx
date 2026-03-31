"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";
import BrazilMap from "../diagrams/BrazilMap";

const phases = [
  {
    phase: "Phase 1",
    title: "Pilot Programme",
    years: "2025 — 2030",
    region: "Mato Grosso",
    color: "bg-forest",
    targets: [
      "20-30% reduction in deforestation per acre",
      "15-25% improvement in farmer willingness to engage",
      "10-15% increase in soybean yield per acre",
      "10-20% reduction in harvesting times",
    ],
    description:
      "Integrate precision agriculture into Cargill's supply chain in Mato Grosso, which accounts for 28% of Brazil's soybean production. Deploy in-ground sensors, targeted spray systems, and automated weeders. Conduct focus groups and workshops with farmers.",
  },
  {
    phase: "Phase 2",
    title: "Evaluation",
    years: "2030 — 2031",
    region: "Assessment Period",
    color: "bg-green-mid",
    targets: [
      "Compare pre-implementation data with 2030 results",
      "Acceptance threshold: within 15% deviation from goals",
      "Lagging factors trigger tailored tech + vocational training",
      "Second round of farmer focus groups",
    ],
    description:
      "Five years after initial deployment, rigorously assess progress. Use both qualitative evaluation (focus groups) and quantitative metrics (deforestation rates, crop yields, harvesting times). Adjust strategy based on evidence.",
  },
  {
    phase: "Phase 3",
    title: "Industry Roll Out",
    years: "2032 — 2035",
    region: "Paraná → Goiás → Rio Grande do Sul",
    color: "bg-soybean",
    targets: [
      "Tranche 1: Paraná — targeting 15% of farms",
      "Tranche 2: Goiás — broader farming community reach",
      "Tranche 3: Rio Grande do Sul — large-scale adoption",
      "ESG leadership positioning for Cargill",
    ],
    description:
      "Expand precision agriculture through a tranche system to segment and minimise geographical risks. Use ESG reporting to demonstrate success and influence broader industry adoption through Rogers' Diffusion of Innovation.",
  },
];

export default function ActionPlan() {
  return (
    <div className="bg-cream py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionLabel number="V" title="Action Plan" />
          <h2 className="text-3xl md:text-4xl font-bold text-forest leading-tight mb-4">
            A 10-year strategy for systemic change
          </h2>
          <p className="text-lg text-text-light max-w-3xl mb-16 leading-relaxed">
            From pilot in Mato Grosso to industry-wide transformation across
            Brazil&apos;s soybean regions.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-forest/20" />

          <div className="space-y-12">
            {phases.map((phase, i) => (
              <AnimatedSection key={phase.phase} delay={i * 0.15}>
                <div className="md:pl-20 relative">
                  {/* Timeline dot */}
                  <div
                    className={`hidden md:flex absolute left-5 top-2 w-7 h-7 rounded-full ${phase.color} items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-forest/10 overflow-hidden shadow-sm">
                    <div className="p-8">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <span
                          className={`inline-block px-3 py-1 ${phase.color} text-white text-xs font-mono tracking-wider rounded uppercase`}
                        >
                          {phase.phase}
                        </span>
                        <span className="font-mono text-xs text-text-light">
                          {phase.years}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-forest mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-sm font-mono text-soybean mb-4">
                        {phase.region}
                      </p>

                      <p className="text-base text-text-light leading-relaxed mb-6">
                        {phase.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.targets.map((t, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <svg
                              viewBox="0 0 16 16"
                              className="w-4 h-4 text-green-mid mt-0.5 shrink-0"
                              fill="currentColor"
                            >
                              <path d="M6.5 12.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4z" />
                            </svg>
                            <span className="text-text">{t}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection className="mt-16">
          <BrazilMap />
        </AnimatedSection>
      </div>
    </div>
  );
}
