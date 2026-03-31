"use client";

import AnimatedSection from "../AnimatedSection";
import SectionLabel from "../SectionLabel";
import PullQuote from "../PullQuote";

export default function Problem() {
  return (
    <AnimatedSection className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto">
      <SectionLabel number="II" title="The Problem" />

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-forest leading-tight">
            Brazil&apos;s deforestation crisis is driven by soybean expansion
          </h2>
          <p className="text-lg leading-relaxed text-text">
            Between 2001 and 2023, Brazil experienced some of the highest
            deforestation rates globally. In Brazil,{" "}
            <strong>62% of tree cover loss</strong> from 2000 to 2023 was due to
            deforestation. Cargill, operating across all major affected
            countries, has been widely criticised for directly contributing to
            this crisis.
          </p>
          <p className="text-lg leading-relaxed text-text">
            Over the past decade, soy production in Brazil has nearly doubled.
            The Cerrado, Brazil&apos;s tropical savannah, has lost{" "}
            <strong>over half of its 100 million hectares</strong> of forest,
            primarily due to soybean farming expansion.
          </p>
          <p className="text-lg leading-relaxed text-text">
            The impacts extend beyond deforestation: high water usage contributes
            to scarcity, pesticides and fertilisers cause soil erosion and
            groundwater contamination, and extensive land use devastates
            surrounding ecosystems.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-forest-dark rounded-xl p-8 text-cream">
            <p className="font-mono text-xs tracking-widest uppercase text-soybean mb-4">
              Key Finding
            </p>
            <p className="text-2xl font-bold leading-snug mb-4">
              Soybean yields would have been{" "}
              <span className="text-soybean">6.6% higher</span> if rainfall
              patterns were not altered by deforestation.
            </p>
            <p className="text-sm text-cream/60">
              De Souza Batista et al., &ldquo;Deforestation Induced
              Changes&rdquo; (2023)
            </p>
          </div>

          <div className="mt-6 bg-forest/5 rounded-xl p-8 border border-forest/10">
            <p className="font-mono text-xs tracking-widest uppercase text-text-light mb-3">
              Economic Impact
            </p>
            <p className="text-base leading-relaxed text-text">
              Preventing deforestation is one of the most{" "}
              <strong>cost-effective climate mitigation measures</strong>.
              Deforestation reduces yields and profits by altering rainfall,
              revealing the deep interconnection between climate and the
              economics of the soybean industry.
            </p>
          </div>
        </div>
      </div>

      <PullQuote
        quote="Brazil has experienced land conflicts due to the conversion of land for soy production, leading to migration and displacement of indigenous peoples, worsening water and food insecurity."
        source="Sustainable Nutrition Initiative"
      />
    </AnimatedSection>
  );
}
