"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";

const researchers = [
  {
    name: "Rex Heng",
    degree: "BSc Philosophy, Politics & Economics",
    linkedin: "https://www.linkedin.com/in/rexheng",
    initials: "RH",
  },
  {
    name: "Isabella Equihua Mauti",
    degree: "BSc Economics",
    linkedin: "https://www.linkedin.com/in/isabella-equihua-mauti-63a895235/",
    initials: "IE",
  },
  {
    name: "Alexandra Liepe",
    degree: "BSc Economics",
    linkedin: "https://www.linkedin.com/in/alexandra-liepe-998819298/",
    initials: "AL",
  },
  {
    name: "Ya Qi Wang",
    degree: "BSc Actuarial Science",
    linkedin: "https://www.linkedin.com/in/ya-qi-wang-9522292b7/",
    initials: "YW",
  },
];

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
          {researchers.map((person, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.1}
              className="bg-forest-dark/5 rounded-xl p-6 text-center border border-forest/10"
            >
              <div className="w-20 h-20 bg-forest rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-cream">
                  {person.initials}
                </span>
              </div>
              <h3 className="font-semibold text-forest">{person.name}</h3>
              <p className="text-sm text-text-light mt-1">{person.degree}</p>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-green-mid hover:text-forest transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
