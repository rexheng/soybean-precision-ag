"use client";

import React from "react";

interface BrazilMapProps {
  className?: string;
}

/*
 * Simplified SVG paths for Brazil's outline and key states.
 * These are schematic approximations — recognizable but not
 * geographically precise, suitable for an academic diagram.
 *
 * Coordinate system: roughly 0-600 x, 0-650 y.
 * Brazil's shape: bulge in the NE, narrowing southward to Rio Grande do Sul.
 */

// Full Brazil outline (simplified)
const BRAZIL_OUTLINE =
  "M 290 30 L 330 25 L 380 35 L 430 30 L 470 50 L 510 55 L 540 80 " +
  "L 555 110 L 560 150 L 550 180 L 535 200 L 545 230 L 540 260 " +
  "L 520 290 L 500 310 L 480 340 L 460 370 L 440 400 L 420 430 " +
  "L 400 450 L 380 470 L 360 490 L 340 510 L 320 530 L 300 545 " +
  "L 280 555 L 260 550 L 250 530 L 245 500 L 240 470 L 235 440 " +
  "L 225 410 L 210 390 L 190 370 L 170 355 L 150 340 L 140 320 " +
  "L 130 295 L 120 270 L 115 245 L 110 220 L 120 195 L 135 175 " +
  "L 150 155 L 160 135 L 170 115 L 185 100 L 200 85 L 220 70 " +
  "L 245 55 L 265 42 Z";

// Individual state paths (simplified, positioned within the Brazil outline)
// Mato Grosso — large central-west state
const MATO_GROSSO =
  "M 210 200 L 260 190 L 310 195 L 340 200 L 360 210 " +
  "L 365 240 L 360 270 L 340 290 L 310 295 L 270 290 " +
  "L 240 280 L 220 260 L 210 235 Z";

// Goias — south-central, below and to the right of Mato Grosso
const GOIAS =
  "M 340 290 L 380 285 L 410 300 L 420 330 " +
  "L 410 355 L 385 365 L 355 360 L 335 340 L 330 315 Z";

// Parana — southern state
const PARANA =
  "M 330 400 L 365 390 L 395 400 L 405 425 " +
  "L 395 445 L 370 455 L 340 450 L 325 430 Z";

// Rio Grande do Sul — southernmost
const RIO_GRANDE_DO_SUL =
  "M 300 470 L 335 460 L 365 470 L 370 495 " +
  "L 355 520 L 330 530 L 305 525 L 290 505 L 290 485 Z";

interface StateInfo {
  path: string;
  color: string;
  label: string;
  phase: string;
  /** Label position */
  lx: number;
  ly: number;
}

const STATES: StateInfo[] = [
  {
    path: MATO_GROSSO,
    color: "#2d5016",
    label: "Mato Grosso",
    phase: "Phase 1: Pilot (2025-2030)",
    lx: 285,
    ly: 245,
  },
  {
    path: PARANA,
    color: "#3d7a2a",
    label: "Paran\u00e1",
    phase: "Tranche 1",
    lx: 365,
    ly: 425,
  },
  {
    path: GOIAS,
    color: "#5a9a3a",
    label: "Goi\u00e1s",
    phase: "Tranche 2",
    lx: 375,
    ly: 330,
  },
  {
    path: RIO_GRANDE_DO_SUL,
    color: "#7ab95a",
    label: "Rio Grande\ndo Sul",
    phase: "Tranche 3",
    lx: 330,
    ly: 498,
  },
];

const LEGEND: { color: string; label: string }[] = [
  { color: "#2d5016", label: "Phase 1: Pilot (2025-2030)" },
  { color: "#3d7a2a", label: "Tranche 1" },
  { color: "#5a9a3a", label: "Tranche 2" },
  { color: "#7ab95a", label: "Tranche 3" },
  { color: "#e0e0e0", label: "Other states" },
];

export default function BrazilMap({ className }: BrazilMapProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 650 680"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[550px] mx-auto"
        role="img"
        aria-label="Map of Brazil showing soybean precision agriculture expansion phases across Mato Grosso, Parana, Goias, and Rio Grande do Sul"
      >
        <rect width="650" height="680" fill="white" rx="8" />

        {/* Title */}
        <text
          x="325"
          y="30"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill="#1a1a1a"
        >
          Fig 5.4 &mdash; Soybean Precision Agriculture Expansion Map
        </text>

        {/* Brazil outline (background) */}
        <path
          d={BRAZIL_OUTLINE}
          fill="#e0e0e0"
          stroke="#9ca3af"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Highlighted states */}
        {STATES.map((state, i) => (
          <g key={`state-${i}`}>
            <path
              d={state.path}
              fill={state.color}
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
              opacity="0.9"
            />
          </g>
        ))}

        {/* State labels with callout lines */}
        {STATES.map((state, i) => {
          // Position labels to the right of the map for clarity
          const labelX = 490;
          const labelY = 180 + i * 72;
          const lines = state.label.split("\n");

          return (
            <g key={`label-${i}`}>
              {/* Callout line from state center to label */}
              <line
                x1={state.lx}
                y1={state.ly}
                x2={labelX - 5}
                y2={labelY}
                stroke={state.color}
                strokeWidth="1"
                strokeDasharray="3,2"
                opacity="0.7"
              />
              {/* Dot at state end */}
              <circle
                cx={state.lx}
                cy={state.ly}
                r="3"
                fill="white"
                stroke={state.color}
                strokeWidth="1.5"
              />
              {/* Label background */}
              <rect
                x={labelX - 8}
                y={labelY - 14 - (lines.length > 1 ? 6 : 0)}
                width="140"
                height={lines.length > 1 ? 44 : 32}
                rx="4"
                fill={state.color}
                opacity="0.12"
                stroke={state.color}
                strokeWidth="1"
              />
              {/* State name */}
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={labelX}
                  y={labelY - 2 + li * 13 - (lines.length > 1 ? 3 : 0)}
                  fontSize="11"
                  fontWeight="600"
                  fill="#1a1a1a"
                >
                  {line}
                </text>
              ))}
              {/* Phase text */}
              <text
                x={labelX}
                y={labelY + 12 + (lines.length > 1 ? 8 : 0)}
                fontSize="9"
                fill="#6b7280"
              >
                {state.phase}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(40, 580)">
          <text fontSize="11" fontWeight="600" fill="#374151" y="-8">
            Expansion Phases
          </text>
          {LEGEND.map((item, i) => (
            <g key={`legend-${i}`} transform={`translate(${i * 120}, 10)`}>
              <rect
                width="14"
                height="14"
                rx="2"
                fill={item.color}
                stroke={item.color === "#e0e0e0" ? "#9ca3af" : item.color}
                strokeWidth="0.75"
              />
              <text x="20" y="12" fontSize="9.5" fill="#374151">
                {item.label}
              </text>
            </g>
          ))}
        </g>

        {/* Compass rose */}
        <g transform="translate(80, 100)">
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="white"
            stroke="#d1d5db"
            strokeWidth="1"
          />
          <text
            x="0"
            y="-6"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#374151"
          >
            N
          </text>
          <line
            x1="0"
            y1="-3"
            x2="0"
            y2="12"
            stroke="#9ca3af"
            strokeWidth="1.5"
          />
          <polygon points="0,-14 -4,-6 4,-6" fill="#374151" />
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-zinc-500 italic leading-relaxed">
        Source: Adapted from Farmonaut, &ldquo;Brazilian Agriculture&rdquo;
      </figcaption>
    </figure>
  );
}
