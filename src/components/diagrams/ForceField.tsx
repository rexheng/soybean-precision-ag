"use client";

import React from "react";

interface ForceFieldProps {
  className?: string;
}

interface Force {
  label: string;
  detail: string;
  /** Relative strength 0-1, controls arrow width and length */
  strength: number;
}

const ENABLERS: Force[] = [
  {
    label: "Government Support",
    detail: "Law No. 14.475, up to 250B reais",
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
    strength: 0.55,
  },
];

const OBSTACLES: Force[] = [
  {
    label: "Costs & Profits",
    detail: "GPS $2,000 each, systems $200K+",
    strength: 1.0,
  },
  {
    label: "Farmer Resistance",
    detail: "Training gaps, low education levels",
    strength: 0.65,
  },
  {
    label: "Greenwashing Perceptions",
    detail: "Public scepticism of corporate commitments",
    strength: 0.4,
  },
];

const ENABLER_COLOR = "#3d7a2a";
const OBSTACLE_COLOR = "#c7a84a";

const SVG_W = 760;
const SVG_H = 440;
const CENTER_X = SVG_W / 2;
const MAX_ARROW_LEN = 250;
const MIN_ARROW_H = 24;
const MAX_ARROW_H = 52;
const ROW_SPACING = 100;
const FIRST_ROW_Y = 140;
const HEAD_DEPTH = 24;

function enablerArrowPath(
  cy: number,
  arrowLen: number,
  arrowH: number,
): string {
  const tipX = CENTER_X - 10;
  const baseX = tipX - arrowLen;
  const halfH = arrowH / 2;
  const shaftH = halfH * 0.52;

  return [
    `M ${baseX} ${cy - shaftH}`,
    `L ${tipX - HEAD_DEPTH} ${cy - shaftH}`,
    `L ${tipX - HEAD_DEPTH} ${cy - halfH}`,
    `L ${tipX} ${cy}`,
    `L ${tipX - HEAD_DEPTH} ${cy + halfH}`,
    `L ${tipX - HEAD_DEPTH} ${cy + shaftH}`,
    `L ${baseX} ${cy + shaftH}`,
    `Z`,
  ].join(" ");
}

function obstacleArrowPath(
  cy: number,
  arrowLen: number,
  arrowH: number,
): string {
  const tipX = CENTER_X + 10;
  const baseX = tipX + arrowLen;
  const halfH = arrowH / 2;
  const shaftH = halfH * 0.52;

  return [
    `M ${baseX} ${cy - shaftH}`,
    `L ${tipX + HEAD_DEPTH} ${cy - shaftH}`,
    `L ${tipX + HEAD_DEPTH} ${cy - halfH}`,
    `L ${tipX} ${cy}`,
    `L ${tipX + HEAD_DEPTH} ${cy + halfH}`,
    `L ${tipX + HEAD_DEPTH} ${cy + shaftH}`,
    `L ${baseX} ${cy + shaftH}`,
    `Z`,
  ].join(" ");
}

export default function ForceField({ className }: ForceFieldProps) {
  const rowCount = Math.max(ENABLERS.length, OBSTACLES.length);

  return (
    <figure
      className={className}
      style={{
        background: "#FAFAF8",
        borderRadius: "12px",
        padding: "24px 16px 16px",
      }}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[760px] mx-auto"
        role="img"
        aria-label="Force field analysis diagram showing enablers and obstacles for precision agriculture adoption"
      >
        <defs>
          <filter
            id="arrowShadow"
            x="-5%"
            y="-15%"
            width="110%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        {/* Column headers */}
        <text
          x={CENTER_X / 2}
          y="42"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={ENABLER_COLOR}
          letterSpacing="0.1em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          ENABLERS
        </text>
        <text
          x={CENTER_X + CENTER_X / 2}
          y="42"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={OBSTACLE_COLOR}
          letterSpacing="0.1em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          OBSTACLES
        </text>

        {/* Dashed center line */}
        <line
          x1={CENTER_X}
          y1={65}
          x2={CENTER_X}
          y2={FIRST_ROW_Y + (rowCount - 1) * ROW_SPACING + 40}
          stroke="#374151"
          strokeWidth="2.5"
          strokeDasharray="8,5"
        />

        {/* "Change Threshold" label on center line */}
        <rect
          x={CENTER_X - 58}
          y={68}
          width={116}
          height={18}
          rx={4}
          fill="#FAFAF8"
        />
        <text
          x={CENTER_X}
          y={80}
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#6B7280"
          letterSpacing="0.08em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          CHANGE THRESHOLD
        </text>

        {/* Enabler arrows */}
        {ENABLERS.map((force, i) => {
          const arrowH =
            MIN_ARROW_H + (MAX_ARROW_H - MIN_ARROW_H) * force.strength;
          const arrowLen = MAX_ARROW_LEN * force.strength;
          const cy = FIRST_ROW_Y + i * ROW_SPACING;
          const tipX = CENTER_X - 10;
          const baseX = tipX - arrowLen;

          return (
            <g key={`enabler-${i}`} filter="url(#arrowShadow)">
              <path
                d={enablerArrowPath(cy, arrowLen, arrowH)}
                fill={ENABLER_COLOR}
                opacity="0.88"
              />
              {/* Label inside the shaft */}
              <text
                x={baseX + (arrowLen - HEAD_DEPTH) / 2}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
                fontWeight="700"
                fill="white"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {force.label}
              </text>
              {/* Detail text below */}
              <text
                x={baseX}
                y={cy + arrowH / 2 + 16}
                textAnchor="start"
                fontSize="9"
                fill="#6B7280"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {force.detail}
              </text>
            </g>
          );
        })}

        {/* Obstacle arrows */}
        {OBSTACLES.map((force, i) => {
          const arrowH =
            MIN_ARROW_H + (MAX_ARROW_H - MIN_ARROW_H) * force.strength;
          const arrowLen = MAX_ARROW_LEN * force.strength;
          const cy = FIRST_ROW_Y + i * ROW_SPACING;
          const tipX = CENTER_X + 10;
          const baseX = tipX + arrowLen;

          return (
            <g key={`obstacle-${i}`} filter="url(#arrowShadow)">
              <path
                d={obstacleArrowPath(cy, arrowLen, arrowH)}
                fill={OBSTACLE_COLOR}
                opacity="0.88"
              />
              {/* Label inside the shaft */}
              <text
                x={tipX + HEAD_DEPTH + (arrowLen - HEAD_DEPTH) / 2}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
                fontWeight="700"
                fill="white"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {force.label}
              </text>
              {/* Detail text below */}
              <text
                x={baseX}
                y={cy + arrowH / 2 + 16}
                textAnchor="end"
                fontSize="9"
                fill="#6B7280"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {force.detail}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-center text-xs text-zinc-500 italic leading-relaxed max-w-xl mx-auto">
        <strong className="not-italic text-zinc-600">Fig 4.1</strong>
        {" "}Force Field Analysis: Precision Agriculture Adoption in Brazil.
        Source: Adapted from Lewin, Kurt, &ldquo;Force Field Analysis&rdquo;
      </figcaption>
    </figure>
  );
}
