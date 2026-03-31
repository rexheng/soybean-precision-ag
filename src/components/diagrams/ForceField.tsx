"use client";

import React from "react";

interface ForceFieldProps {
  className?: string;
}

interface Force {
  label: string;
  detail: string;
  /** Relative strength 0-1, controls arrow width */
  strength: number;
}

const ENABLERS: Force[] = [
  {
    label: "Government Support",
    detail: "Law No. 14.475, up to 250B reals",
    strength: 1.0,
  },
  {
    label: "Receptive Private Sector",
    detail: "Cargill committed to eliminating deforestation",
    strength: 0.7,
  },
  {
    label: "Sustainability Trends",
    detail: "COFCO, ADM committed to ESG",
    strength: 0.65,
  },
];

const OBSTACLES: Force[] = [
  {
    label: "Costs & Profits",
    detail: "GPS $2,000 each, systems $200K+",
    strength: 0.9,
  },
  {
    label: "Farmer Resistance",
    detail: "Training gaps, low education levels",
    strength: 0.65,
  },
  {
    label: "Greenwashing Perceptions",
    detail: "Public scepticism",
    strength: 0.45,
  },
];

const ENABLER_COLOR = "#3d7a2a";
const OBSTACLE_COLOR = "#c7a84a";

const SVG_W = 700;
const SVG_H = 460;
const CENTER_X = SVG_W / 2;
const ARROW_ZONE_W = 220; // max arrow length from center
const ARROW_Y_START = 100;
const ARROW_SPACING = 90;
const MIN_ARROW_W = 22;
const MAX_ARROW_W = 42;

export default function ForceField({ className }: ForceFieldProps) {
  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[700px] mx-auto"
        role="img"
        aria-label="Force field analysis diagram showing enablers and obstacles for precision agriculture adoption"
      >
        <rect width={SVG_W} height={SVG_H} fill="white" rx="8" />

        {/* Title */}
        <text
          x={CENTER_X}
          y="30"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill="#1a1a1a"
        >
          Fig 4.1 &mdash; Force Field Analysis: Precision Agriculture Adoption
        </text>

        {/* Column headers */}
        <text
          x={CENTER_X - ARROW_ZONE_W / 2 - 40}
          y="62"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={ENABLER_COLOR}
        >
          ENABLERS
        </text>
        <text
          x={CENTER_X + ARROW_ZONE_W / 2 + 40}
          y="62"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={OBSTACLE_COLOR}
        >
          OBSTACLES
        </text>

        {/* Center line */}
        <line
          x1={CENTER_X}
          y1="72"
          x2={CENTER_X}
          y2={ARROW_Y_START + ENABLERS.length * ARROW_SPACING + 10}
          stroke="#374151"
          strokeWidth="2.5"
          strokeDasharray="6,4"
        />
        {/* Threshold label */}
        <text
          x={CENTER_X}
          y="86"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="500"
          fill="#6b7280"
          letterSpacing="0.05em"
        >
          CHANGE THRESHOLD
        </text>

        {/* Enabler arrows (left side, pointing right toward center) */}
        {ENABLERS.map((force, i) => {
          const arrowH =
            MIN_ARROW_W + (MAX_ARROW_W - MIN_ARROW_W) * force.strength;
          const arrowLen = ARROW_ZONE_W * force.strength;
          const cy = ARROW_Y_START + i * ARROW_SPACING + 40;
          const tipX = CENTER_X - 8;
          const baseX = tipX - arrowLen;
          const halfH = arrowH / 2;
          const headDepth = 20;
          const shaftH = halfH * 0.55;

          // Arrow shape: shaft + arrowhead pointing right
          const path = `
            M ${baseX} ${cy - shaftH}
            L ${tipX - headDepth} ${cy - shaftH}
            L ${tipX - headDepth} ${cy - halfH}
            L ${tipX} ${cy}
            L ${tipX - headDepth} ${cy + halfH}
            L ${tipX - headDepth} ${cy + shaftH}
            L ${baseX} ${cy + shaftH}
            Z
          `;

          return (
            <g key={`enabler-${i}`}>
              <path
                d={path}
                fill={ENABLER_COLOR}
                opacity="0.82"
              />
              {/* Label inside arrow */}
              <text
                x={baseX + (arrowLen - headDepth) / 2}
                y={cy - 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontWeight="600"
                fill="white"
              >
                {force.label}
              </text>
              {/* Detail below arrow */}
              <text
                x={baseX}
                y={cy + halfH + 14}
                textAnchor="start"
                fontSize="9"
                fill="#6b7280"
              >
                {force.detail}
              </text>
            </g>
          );
        })}

        {/* Obstacle arrows (right side, pointing left toward center) */}
        {OBSTACLES.map((force, i) => {
          const arrowH =
            MIN_ARROW_W + (MAX_ARROW_W - MIN_ARROW_W) * force.strength;
          const arrowLen = ARROW_ZONE_W * force.strength;
          const cy = ARROW_Y_START + i * ARROW_SPACING + 40;
          const tipX = CENTER_X + 8;
          const baseX = tipX + arrowLen;
          const halfH = arrowH / 2;
          const headDepth = 20;
          const shaftH = halfH * 0.55;

          // Arrow shape: shaft + arrowhead pointing left
          const path = `
            M ${baseX} ${cy - shaftH}
            L ${tipX + headDepth} ${cy - shaftH}
            L ${tipX + headDepth} ${cy - halfH}
            L ${tipX} ${cy}
            L ${tipX + headDepth} ${cy + halfH}
            L ${tipX + headDepth} ${cy + shaftH}
            L ${baseX} ${cy + shaftH}
            Z
          `;

          return (
            <g key={`obstacle-${i}`}>
              <path
                d={path}
                fill={OBSTACLE_COLOR}
                opacity="0.82"
              />
              {/* Label inside arrow */}
              <text
                x={tipX + headDepth + (arrowLen - headDepth) / 2}
                y={cy - 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontWeight="600"
                fill="white"
              >
                {force.label}
              </text>
              {/* Detail below arrow */}
              <text
                x={baseX}
                y={cy + halfH + 14}
                textAnchor="end"
                fontSize="9"
                fill="#6b7280"
              >
                {force.detail}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-zinc-500 italic leading-relaxed">
        Source: Adapted from Lewin, Kurt, &ldquo;Force Field Analysis&rdquo;
      </figcaption>
    </figure>
  );
}
