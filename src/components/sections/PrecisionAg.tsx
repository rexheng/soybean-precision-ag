"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";
import StatCounter from "../StatCounter";

const technologies = [
  {
    title: "In-ground Sensors",
    description:
      "Monitor moisture, pH levels, and nutrient content in real-time to help farmers make informed irrigation and soil management decisions.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={24} cy={20} r={8} />
        <path d="M24 28v14M16 42h16" />
        <path d="M18 16l-4-8M30 16l4-8M24 12V4" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: "Targeted Spray Systems",
    description:
      "Optimise fertiliser, pesticide, and herbicide application to reduce waste, environmental harm, and input costs through precise delivery.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 8h24v8H12z" />
        <path d="M16 16v4M24 16v4M32 16v4" />
        <circle cx={16} cy={28} r={4} strokeDasharray="2 2" />
        <circle cx={24} cy={28} r={4} strokeDasharray="2 2" />
        <circle cx={32} cy={28} r={4} strokeDasharray="2 2" />
        <path d="M8 36h32" />
      </svg>
    ),
  },
  {
    title: "Automated Weeders",
    description:
      "Detect and remove weeds mechanically without chemicals or manual labour, reducing herbicide use and protecting growing crops.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M24 40V24" />
        <path d="M18 18c0-6 6-14 6-14s6 8 6 14-3 8-6 8-6-2-6-8z" />
        <path d="M10 40h28" />
        <path d="M8 36l8-4M40 36l-8-4" />
      </svg>
    ),
  },
];

export default function PrecisionAg() {
  return (
    <div className="bg-forest-dark text-cream py-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionLabel number="III.B" title="Precision Agriculture" />

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Technology that increases yields{" "}
            <span className="text-soybean">and</span> reduces harm.
          </h2>
          <p className="text-lg text-cream/70 max-w-3xl mb-16 leading-relaxed">
            Precision agriculture employs technology to make farming practices
            more exact, improving outputs while reducing environmental impact.
            These techniques have been proven in Canada and Brazil.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {technologies.map((tech, i) => (
            <AnimatedSection
              key={tech.title}
              delay={i * 0.15}
              className="bg-cream/5 border border-cream/10 rounded-xl p-8"
            >
              <div className="text-soybean mb-4">{tech.icon}</div>
              <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
              <p className="text-cream/60 leading-relaxed">
                {tech.description}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="border-t border-cream/10 pt-12">
            <p className="font-mono text-xs tracking-widest uppercase text-soybean mb-8 text-center">
              Farmonaut Case Study — Mato Grosso, Brazil
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter
                label="Yield Increase"
                end={15}
                suffix="%"
                sublabel="soybean output"
              />
              <StatCounter
                label="Fertiliser Reduction"
                end={20}
                suffix="%"
                sublabel="less input waste"
              />
              <StatCounter
                label="Farmer Adoption"
                end={84}
                suffix="%"
                sublabel="digitisation uptake"
              />
              <StatCounter
                label="Eager to Learn"
                end={95}
                suffix="%"
                sublabel="want new tech"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
