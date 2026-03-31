"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";
import PullQuote from "../PullQuote";
import RadarChart from "../diagrams/RadarChart";
import FeedbackLoop from "../diagrams/FeedbackLoop";

export default function PolicyProposal() {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto">
      <AnimatedSection>
        <SectionLabel number="III" title="Policy Proposal" />

        <h2 className="text-3xl md:text-4xl font-bold text-forest leading-tight mb-6">
          Why Cargill? The power to shift a system.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              This report targets <strong>Cargill</strong>, a corporation with
              immense systemic power. In 2023, Cargill was the leading business
              in Brazil&apos;s agricultural sector with{" "}
              <strong>124 billion Brazilian reals</strong> in net revenue.
            </p>
            <p className="text-lg leading-relaxed">
              Cargill possesses <em>power-over</em> through its hierarchy
              position, and <em>hard power</em> through financial means. It can
              leverage supernormal profits for lobbying and financial assistance
              to farmers implementing the proposed intervention.
            </p>
            <p className="text-lg leading-relaxed">
              Historically, Cargill has demonstrated collaborative influence —
              the <strong>Ferrogrão railway project</strong> saw a $4.3B
              investment partnering with rivals ADM, Bunge, and Amaggi.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              In contrast, the Brazilian federal government faces vested
              political interests. Short 4-year election cycles incentivise
              loosening deforestation restrictions for electoral support, while
              Cargill&apos;s 8-20 year business cycles enable long-term
              strategic thinking.
            </p>
            <p className="text-lg leading-relaxed">
              Although the government may have greater power-over and
              power-to-initiate, the role of political self-interest directs us
              toward the conclusion that{" "}
              <strong>
                distributors and producers of soy can change the agricultural
                system
              </strong>
              .
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="my-16">
        <RadarChart />
      </AnimatedSection>

      <AnimatedSection>
        <h3 className="text-2xl md:text-3xl font-bold text-forest leading-tight mb-6">
          The Proposed Intervention
        </h3>

        <div className="space-y-6 max-w-3xl">
          <p className="text-lg leading-relaxed">
            Within Ostrom&apos;s framework, the current system governing
            rainforests as a Common Pool Resource is problematic, lacking clearly
            defined boundaries. A{" "}
            <strong>positive feedback loop</strong> drives the crisis: as
            deforestation expands for soybean crops, rainfall patterns shift,
            reducing yields — prompting farmers to deforest{" "}
            <em>more</em> land.
          </p>
          <p className="text-lg leading-relaxed">
            This report suggests Cargill adopt{" "}
            <strong>precision agriculture technology</strong> to break this
            cycle. By intervening at the leverage point of crop yields, Cargill
            can halt the feedback loop and empower farmers to self-organise the
            system.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="my-16">
        <FeedbackLoop />
      </AnimatedSection>

      <PullQuote
        quote="Cargill has been striving to 'disseminate good agricultural practices for farming operations' and 'advance certification schemes that deliver greater value to farmers and customers.'"
        source="Cargill, South American Soy Action Plan (2019)"
      />
    </div>
  );
}
