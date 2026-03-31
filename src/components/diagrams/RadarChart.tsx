"use client";

import React from "react";

interface RadarChartProps {
  className?: string;
}

const AXES = [
  "Power-over",
  "Power-to",
  "Power-with",
  "Power to resist",
  "Hard power",
];

// Values from 0-1 for each stakeholder across the 5 dimensions
const STAKEHOLDERS = [
  {
    name: "Corporations (e.g. Cargill)",
    color: "#2d5016",
    // High across all dimensions — largest polygon
    values: [0.92, 0.88, 0.75, 0.82, 0.95],
  },
  {
    name: "Government",
    color: "#c7a84a",
    // High power-over and power-to, lower power-with
    values: [0.78, 0.72, 0.35, 0.55, 0.7],
  },
  {
    name: "Farmers / Civil Society",
    color: "#8B7355",
    // Smallest area, some power-with and power-to-resist
    values: [0.18, 0.25, 0.55, 0.4, 0.12],
  },
];

const CENTER_X = 250;
const CENTER_Y = 230;
const RADIUS = 160;
const RINGS = 5;

function polarToCartesian(
  angle: number,
  radius: number,
): { x: number; y: number } {
  // Start from top (subtract 90 degrees)
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(rad),
    y: CENTER_Y + radius * Math.sin(rad),
  };
}

function getAxisAngle(index: number): number {
  return (360 / AXES.length) * index;
}

function buildPolygonPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const { x, y } = polarToCartesian(getAxisAngle(i), RADIUS * v);
      return `${x},${y}`;
    })
    .join(" ");
}

export default function RadarChart({ className }: RadarChartProps) {
  // Grid rings
  const rings = Array.from({ length: RINGS }, (_, i) => {
    const r = (RADIUS / RINGS) * (i + 1);
    const points = AXES.map((_, j) => {
      const { x, y } = polarToCartesian(getAxisAngle(j), r);
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // Axis label positions — pushed further out from the chart
  const labelPositions = AXES.map((label, i) => {
    const angle = getAxisAngle(i);
    const { x, y } = polarToCartesian(angle, RADIUS + 30);
    let anchor: "start" | "middle" | "end" = "middle";
    let dy = 0;

    // Fine-tune positions based on angle
    if (angle === 0) {
      dy = -8;
    } else if (angle > 0 && angle < 180) {
      anchor = "start";
    } else if (angle > 180 && angle < 360) {
      anchor = "end";
    }
    if (angle > 90 && angle < 270) {
      dy = 14;
    }

    return { label, x, y, anchor, dy };
  });

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 500 520"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[500px] mx-auto"
        role="img"
        aria-label="Radar chart comparing power dimensions across Corporations, Government, and Farmers/Civil Society"
      >
        {/* Background */}
        <rect width="500" height="520" fill="white" rx="8" />

        {/* Title */}
        <text
          x={CENTER_X}
          y="28"
          textAnchor="middle"
          className="text-sm"
          fontWeight="600"
          fill="#1a1a1a"
          fontSize="14"
        >
          Fig 3.1 &mdash; Power Radar Chart
        </text>

        {/* Grid rings */}
        {rings.map((points, i) => (
          <polygon
            key={`ring-${i}`}
            points={points}
            fill="none"
            stroke="#d1d5db"
            strokeWidth={i === RINGS - 1 ? 1.5 : 0.75}
            strokeDasharray={i === RINGS - 1 ? "none" : "3,3"}
          />
        ))}

        {/* Axis lines */}
        {AXES.map((_, i) => {
          const { x, y } = polarToCartesian(getAxisAngle(i), RADIUS);
          return (
            <line
              key={`axis-${i}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={x}
              y2={y}
              stroke="#9ca3af"
              strokeWidth="0.75"
            />
          );
        })}

        {/* Stakeholder polygons — render smallest on top */}
        {[...STAKEHOLDERS].reverse().map((stakeholder, idx) => (
          <polygon
            key={`poly-${idx}`}
            points={buildPolygonPoints(stakeholder.values)}
            fill={stakeholder.color}
            fillOpacity="0.18"
            stroke={stakeholder.color}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ))}

        {/* Data points */}
        {STAKEHOLDERS.map((stakeholder, sIdx) =>
          stakeholder.values.map((v, aIdx) => {
            const { x, y } = polarToCartesian(
              getAxisAngle(aIdx),
              RADIUS * v,
            );
            return (
              <circle
                key={`dot-${sIdx}-${aIdx}`}
                cx={x}
                cy={y}
                r="3"
                fill={stakeholder.color}
                stroke="white"
                strokeWidth="1"
              />
            );
          }),
        )}

        {/* Axis labels */}
        {labelPositions.map(({ label, x, y, anchor, dy }, i) => (
          <text
            key={`label-${i}`}
            x={x}
            y={y + dy}
            textAnchor={anchor}
            fontSize="11"
            fontWeight="500"
            fill="#374151"
          >
            {label}
          </text>
        ))}

        {/* Legend */}
        {STAKEHOLDERS.map((s, i) => {
          const lx = 60;
          const ly = 435 + i * 24;
          return (
            <g key={`legend-${i}`}>
              <rect
                x={lx}
                y={ly - 8}
                width="16"
                height="16"
                rx="3"
                fill={s.color}
                fillOpacity="0.25"
                stroke={s.color}
                strokeWidth="1.5"
              />
              <text x={lx + 24} y={ly + 4} fontSize="11.5" fill="#374151">
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-zinc-500 italic leading-relaxed">
        Source: Adapted from Winhall and Leadbeater, &ldquo;Power to shift a
        system&rdquo;
      </figcaption>
    </figure>
  );
}
