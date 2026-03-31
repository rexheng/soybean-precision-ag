"use client";

import React from "react";

interface FeedbackLoopProps {
  className?: string;
}

/**
 * Fig 3.2 — Positive Feedback Loop (Systems Thinking Diagram)
 * Adapted from De Souza Batista et al., "Deforestation Induced Changes"
 *
 * Visually matched to the original Sway diagram:
 * - Pink/magenta top nodes, red central hub, orange cascading nodes
 * - Bright lime-green Cargill node, teal State Revenue
 * - Yellow/gold arrows throughout
 * - Hub-and-spoke topology with branching economic consequences
 */

interface NodeDef {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  r: number;
}

// Positions closely matching the original diagram layout
const NODES: NodeDef[] = [
  // Top: initial cause (pink/magenta in original)
  { id: "deforestation", label: "Deforestation", color: "#D64B8A", x: 360, y: 55, r: 36 },
  { id: "rainfall", label: "Altered Rainfall\nPatterns", color: "#E8873C", x: 540, y: 120, r: 32 },

  // Center: the HUB (bright red, largest)
  { id: "yields", label: "Crop Yields &\nFarming Impacted", color: "#E53030", x: 400, y: 260, r: 56 },

  // Upper left branch
  { id: "incomes", label: "Farm Incomes\nFall", color: "#F09030", x: 270, y: 120, r: 30 },

  // Left cascade
  { id: "state", label: "State Revenue\nDeclines", color: "#3EA17D", x: 160, y: 240, r: 32 },
  { id: "bonds", label: "Loss for Sovereign\nBond Investors", color: "#D07030", x: 200, y: 400, r: 33 },
  { id: "supply", label: "Loss for Investors\nin Supply Chain", color: "#F09030", x: 340, y: 450, r: 33 },

  // Right branch
  { id: "export", label: "Loss in Export\nRevenue", color: "#F09030", x: 580, y: 350, r: 32 },

  // Convergence (bright lime-green in original)
  { id: "cargill", label: "Cargill is\nAffected", color: "#A8D534", x: 620, y: 180, r: 34 },
];

// Directed edges: [fromId, toId]
const ARROWS: [string, string][] = [
  // Causal chain
  ["deforestation", "rainfall"],
  ["rainfall", "yields"],

  // Hub radiates to multiple consequences
  ["yields", "incomes"],
  ["yields", "export"],
  ["yields", "state"],

  // Left cascade: incomes → state → bonds → supply chain
  ["incomes", "state"],
  ["state", "bonds"],
  ["bonds", "supply"],

  // Convergence on Cargill from two paths
  ["supply", "cargill"],
  ["export", "cargill"],

  // Feedback loop closure (back to deforestation)
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

  const gap = 5;
  const sx = from.x + ux * (from.r + gap);
  const sy = from.y + uy * (from.r + gap);
  const ex = to.x - ux * (to.r + gap + 8);
  const ey = to.y - uy * (to.r + gap + 8);

  // Perpendicular offset for curve
  const perpX = uy * curveDir;
  const perpY = -ux * curveDir;
  const curvature = dist * 0.15;
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

// Custom curve directions to avoid overlapping arrows
function getCurveDir(fromId: string, toId: string): number {
  if (fromId === "cargill" && toId === "deforestation") return -1;
  if (fromId === "supply" && toId === "cargill") return -1;
  if (fromId === "yields" && toId === "state") return -1;
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
        viewBox="0 0 780 520"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[780px] mx-auto"
        role="img"
        aria-label="Systems diagram showing deforestation-yield positive feedback loop"
      >
        <defs>
          {/* Yellow/gold arrowhead matching original */}
          <marker
            id="fbArrowGold"
            viewBox="0 0 12 10"
            refX="10"
            refY="5"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path d="M 0 1 L 12 5 L 0 9 L 3 5 Z" fill="#D4A832" />
          </marker>

          {/* Red arrowhead for feedback closure */}
          <marker
            id="fbArrowRed"
            viewBox="0 0 12 10"
            refX="10"
            refY="5"
            markerWidth="9"
            markerHeight="9"
            orient="auto"
          >
            <path d="M 0 1 L 12 5 L 0 9 L 3 5 Z" fill="#E53030" />
          </marker>

          {/* Drop shadow */}
          <filter id="nodeShadow3" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        {/* Yellow/gold arrows */}
        {ARROWS.map(([fromId, toId], i) => {
          const from = getNode(fromId);
          const to = getNode(toId);
          const curveDir = getCurveDir(fromId, toId);
          const d = arrowPath(from, to, curveDir);
          const isFeedback = fromId === "cargill" && toId === "deforestation";
          return (
            <path
              key={`arrow-${i}`}
              d={d}
              fill="none"
              stroke={isFeedback ? "#E53030" : "#D4A832"}
              strokeWidth={isFeedback ? 2.5 : 2.5}
              strokeLinecap="round"
              strokeDasharray={isFeedback ? "6 4" : "none"}
              markerEnd={isFeedback ? "url(#fbArrowRed)" : "url(#fbArrowGold)"}
            />
          );
        })}

        {/* Nodes: circles + labels */}
        {NODES.map((node) => (
          <g key={node.id} filter="url(#nodeShadow3)">
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} />
            {/* Dashed outer ring on central hub */}
            {node.id === "yields" && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 7}
                fill="none"
                stroke="#E53030"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                opacity="0.45"
              />
            )}
            <MultilineText
              text={node.label}
              x={node.x}
              y={node.y}
              fontSize={node.r >= 50 ? 11.5 : 9}
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
