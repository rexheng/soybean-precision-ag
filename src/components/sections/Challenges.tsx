"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";
import ForceField from "../diagrams/ForceField";

const enablers = [
  {
    title: "Government Support",
    detail:
      "Law No. 14.475 directs up to 250 billion reals to precision agriculture development and support.",
  },
  {
    title: "Receptive Private Sector",
    detail:
      "Cargill committed to eliminating deforestation from supply chains. Integrating regenerative agriculture into ESG strategies.",
  },
  {
    title: "Sustainability Trends",
    detail:
      "Major industry leaders COFCO and ADM have committed to sustainability goals, integrating technology with ESG targets.",
  },
];

const obstacles = [
  {
    title: "Costs & Profits",
    detail:
      "GPS receivers cost up to $2,000 each. Advanced systems require $200,000+ upfront. But GPS tech reduces expenses by $13-25/acre.",
  },
  {
    title: "Farmer Resistance",
    detail:
      "Training gaps and low education levels among hired labor. However, 84% of farmers have adopted some digitisation and 95% want to learn more.",
  },
  {
    title: "Greenwashing Perceptions",
    detail:
      "Public skepticism toward 'green' corporate claims. Cargill can draw on 442+ scientific publications and 35 years of PA implementation in Brazil.",
  },
];

export default function Challenges() {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionLabel number="IV" title="Challenges to Making Change" />
        <h2 className="text-3xl md:text-4xl font-bold text-forest leading-tight mb-4">
          Forces for and against change
        </h2>
        <p className="text-lg text-text-light max-w-3xl mb-16 leading-relaxed">
          Using Lewin&apos;s Force Field Analysis, this report evaluates
          enablers and inhibitors of the proposed intervention.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <ForceField />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12">
        <AnimatedSection>
          <h3 className="text-xl font-bold text-green-mid mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-mid/10 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 text-green-mid"
                fill="currentColor"
              >
                <path d="M8 1l2.5 5 5.5.8-4 3.9.9 5.3L8 13.3 3.1 16l.9-5.3-4-3.9L5.5 6z" />
              </svg>
            </span>
            Enablers of Change
          </h3>
          <div className="space-y-4">
            {enablers.map((e, i) => (
              <div
                key={i}
                className="bg-green-mid/5 border border-green-mid/15 rounded-lg p-5"
              >
                <h4 className="font-semibold text-forest mb-1">{e.title}</h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h3 className="text-xl font-bold text-soybean mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-soybean/10 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 text-soybean"
                fill="currentColor"
              >
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7v-2h2v2zm0-3H7V4h2v5z" />
              </svg>
            </span>
            Overcoming Obstacles
          </h3>
          <div className="space-y-4">
            {obstacles.map((o, i) => (
              <div
                key={i}
                className="bg-soybean/5 border border-soybean/15 rounded-lg p-5"
              >
                <h4 className="font-semibold text-forest mb-1">{o.title}</h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {o.detail}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
