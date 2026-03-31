"use client";

import { motion } from "framer-motion";
import StatCounter from "../StatCounter";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end bg-forest-dark overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-4 z-10">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/60">
          Research Intelligence Report
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-cream/60">
          03.2025 / LSE Student Research
        </span>
      </div>

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-soybean/20 text-soybean font-mono text-xs tracking-widest uppercase rounded">
              Legacy Futures
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] tracking-tight max-w-5xl">
            Precision
            <br />
            Agriculture in the
            <br />
            <span className="text-soybean">Brazilian Soybean</span>
            <br />
            Industry.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-2xl leading-relaxed">
            Mapping the nexus between soybean farming expansion and
            deforestation, and proposing a technology-driven path to
            sustainability through Cargill&apos;s adoption of precision
            agriculture.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl"
        >
          <div className="bg-cream/5 border border-cream/10 rounded-lg p-6">
            <StatCounter
              label="Tree Cover Loss"
              end={62}
              suffix="%"
              sublabel="since 2000"
            />
          </div>
          <div className="bg-cream/5 border border-cream/10 rounded-lg p-6">
            <StatCounter
              label="Cargill Revenue"
              end={124}
              prefix="R$"
              suffix="B"
              sublabel="net revenue / 2023"
            />
          </div>
          <div className="bg-cream/5 border border-cream/10 rounded-lg p-6">
            <StatCounter
              label="Yield Increase"
              end={15}
              suffix="%"
              sublabel="with precision ag"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-cream/30 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-cream/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
