"use client";

import React from "react";

interface FeedbackLoopProps {
  className?: string;
}

/**
 * Fig 3.2 — Positive Feedback Loop (Systems Thinking Diagram)
 *
 * Adapted from De Souza Batista et al., "Deforestation Induced Changes"
 *
 * This is NOT a simple ring. The original diagram shows:
 * - A causal chain: Deforestation → Altered Rainfall → Crop Yields (central hub)
 * - The central "Crop Yields" hub radiates to multiple economic consequences
 * - Two branches of consequences converge on "Cargill is Affected"
 * - Cargill feeds back to Deforestation, closing the positive feedback loop
 */

interface NodeDef {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  r: number;
}

// Positions based on the original diagram layout
const NODES: NodeDef[] = [
  // Top: initial cause chain
  { id: "deforestation", label: "Deforestation", color: "#9B2335", x: 400, y: 60, r: 38 },
  { id: "rainfall", label: "Altered Rainfall\nPatterns", color: "#E07B39", x: 610, y: 140, r: 34 },

  // Center: the HUB
  { id: "yields", label: "Crop Yields &\nFarming Impacted", color: "#CC2936", x: 500, y: 280, r: 52 },

  // Right branch (economic)
  { id: "export", label: "Loss in Export\nRevenue", color: "#E07B39", x: 680, y: 400, r: 32 },

  // Left branch (cascading economic effects)
  { id: "incomes", label: "Farm Incomes\nFall", color: "#E07B39", x: 350, y: 150, r: 32 },
  { id: "state", label: "State Revenue\nDeclines", color: "#4A8C5C", x: 180, y: 260, r: 34 },
  { id: "bonds", label: "Loss for Sovereign\nBond Investors", color: "#D06830", x: 200, y: 430, r: 34 },
  { id: "supply", label: "Loss for Investors\nin Supply Chain", color: "#E07B39", x: 380, y: 480, r: 34 },

  // Convergence point
  { id: "cargill", label: "Cargill is\nAffected", color: "#7CCC2E", x: 680, y: 250, r: 36 },
];

// Arrows: [fromId, toId]
const ARROWS: [string, string][] = [
  // Causal chain
  ["deforestation", "rainfall"],
  ["rainfall", "yields"],

  // Hub radiates to multiple consequences
  ["yields", "incomes"],
  ["yields", "export"],
  ["yields", "state"],

  // Left cascade
  ["incomes", "state"],
  ["state", "bonds"],
  ["bonds", "supply"],

  // Convergence on Cargill
  ["supply", "cargill"],
  ["export", "cargill"],

  // Feedback loop closure
  ["cargill", "deforestation"],
];

function getNode(id: string): NodeDef {
  return NODES.find((n) => n.id === id)!;
}

function arrowPath(from: NodeDef, to: NodeDef, curveDir: number = 1): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return "";
  const ux = dx / dist;
  const uy = dy / dist;

  const gap = 6;
  const sx = from.x + ux * (from.r + gap);
  const sy = from.y + uy * (from.r + gap);
  const ex = to.x - ux * (to.r + gap + 6);
  const ey = to.y - uy * (to.r + gap + 6);

  // Perpendicular offset for curve
  const perpX = uy * curveDir;
  const perpY = -ux * curveDir;
  const curvature = dist * 0.18;
  const cpx = (sx + ex) / 2 + perpX * curvature;
  const cpy = (sy + ey) / 2 + perpY * curvature;

  return `M ${sx} ${sy} Q ${cpx} ${cpy} ${ex} ${ey}`;
}

function MultilineText({
  text,
  x,
  y,
  fontSize,
  fill,
}: {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fill: string;
}) {
  const lines = text.split("\n");
  const lineHeight = fontSize * 1.25;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;

  return (
    <>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={startY + i * lineHeight}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize}
          fontWeight="700"
          fill={fill}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {line}
        </text>
      ))}
    </>
  );
}

// Determine curve direction for each arrow to avoid overlaps
function getCurveDir(fromId: string, toId: string): number {
  // Feedback arrow (Cargill → Deforestation) curves the other way
  if (fromId === "cargill" && toId === "deforestation") return -1;
  // Supply chain → Cargill curves right
  if (fromId === "supply" && toId === "cargill") return -1;
  return 1;
}

export default function FeedbackLoop({ className }: FeedbackLoopProps) {
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
        viewBox="0 0 800 560"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[800px] mx-auto"
        role="img"
        aria-label="Systems diagram showing deforestation-yield positive feedback loop with branching economic consequences"
      >
        <defs>
          <marker
            id="fbArrow"
            viewBox="0 0 12 10"
            refX="10"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M 0 1 L 12 5 L 0 9 L 3 5 Z" fill="#8B7355" />
          </marker>

          <marker
            id="fbArrowRed"
            viewBox="0 0 12 10"
            refX="10"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M 0 1 L 12 5 L 0 9 L 3 5 Z" fill="#CC2936" />
          </marker>

          <filter id="nodeShadow2" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000"
              floodOpacity="0.15"
            />
          </filter>
        </defs>

        {/* Arrows */}
        {ARROWS.map(([fromId, toId], i) => {
          const from = getNode(fromId);
          const to = getNode(toId);
          const curveDir = getCurveDir(fromId, toId);
          const d = arrowPath(from, to, curveDir);
          // Feedback loop closure arrow is highlighted
          const isFeedback = fromId === "cargill" && toId === "deforestation";
          return (
            <path
              key={`arrow-${i}`}
              d={d}
              fill="none"
              stroke={isFeedback ? "#CC2936" : "#8B7355"}
              strokeWidth={isFeedback ? 2.5 : 2}
              strokeLinecap="round"
              strokeDasharray={isFeedback ? "6 4" : "none"}
              markerEnd={isFeedback ? "url(#fbArrowRed)" : "url(#fbArrow)"}
              opacity={0.7}
            />
          );
        })}

        {/* Central label */}
        <text
          x={420}
          y={380}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#9CA3AF"
          letterSpacing="0.12em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          POSITIVE FEEDBACK
        </text>
        <text
          x={420}
          y={396}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#9CA3AF"
          letterSpacing="0.12em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          LOOP
        </text>

        {/* Nodes */}
        {NODES.map((node) => (
          <g key={node.id} filter="url(#nodeShadow2)">
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} />
            {/* Dashed ring for the central hub node */}
            {node.id === "yields" && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 6}
                fill="none"
                stroke={node.color}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.5"
              />
            )}
            <MultilineText
              text={node.label}
              x={node.x}
              y={node.y}
              fontSize={node.r >= 40 ? 11 : 9.5}
              fill="white"
            />
          </g>
        ))}
      </svg>

      <figcaption className="mt-3 text-center text-xs text-zinc-500 italic leading-relaxed max-w-xl mx-auto">
        <strong className="not-italic text-zinc-600">Fig 3.2</strong>{" "}
        Positive Feedback Loop: Deforestation-Yield Vicious Cycle. The central
        &ldquo;Crop Yields&rdquo; node radiates to multiple economic
        consequences, which converge on Cargill and drive further deforestation.
        Source: Adapted from De Souza Batista et al., &ldquo;Deforestation
        Induced Changes&rdquo;
      </figcaption>
    </figure>
  );
}
