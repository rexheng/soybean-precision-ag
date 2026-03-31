"use client";

import React from "react";

interface FeedbackLoopProps {
  className?: string;
}

interface Node {
  label: string;
  color: string;
  /** Radius of the node — larger = more prominent */
  r: number;
}

const NODES: Node[] = [
  { label: "Deforestation", color: "#c0392b", r: 38 },
  { label: "Altered Rainfall\nPatterns", color: "#e67e22", r: 34 },
  { label: "Crop Yields\nDecline", color: "#e74c3c", r: 44 }, // Central impact — larger
  { label: "Farm Incomes\nFall", color: "#f39c12", r: 34 },
  { label: "State Revenue\nDeclines", color: "#e67e22", r: 34 },
  { label: "Loss for Bond\nInvestors", color: "#d35400", r: 34 },
  { label: "Supply Chain\nLosses", color: "#e67e22", r: 34 },
  { label: "Loss in Export\nRevenue", color: "#e67e22", r: 34 },
  { label: "Cargill is\nAffected", color: "#27ae60", r: 36 },
  { label: "More Land\nClearing", color: "#c0392b", r: 34 },
];

const CX = 350;
const CY = 310;
const ORBIT = 210;

function getNodePosition(
  index: number,
  total: number,
): { x: number; y: number } {
  // Distribute evenly, starting from top
  const angle = ((2 * Math.PI) / total) * index - Math.PI / 2;
  return {
    x: CX + ORBIT * Math.cos(angle),
    y: CY + ORBIT * Math.sin(angle),
  };
}

/**
 * Build a curved arrow path between two nodes (arc segment).
 * We offset start/end by the node radius so the arrow emerges from the edge.
 */
function buildArrowPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r1: number,
  r2: number,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / dist;
  const uy = dy / dist;

  // Offset start and end by node radii + small gap
  const sx = x1 + ux * (r1 + 6);
  const sy = y1 + uy * (r1 + 6);
  const ex = x2 - ux * (r2 + 10);
  const ey = y2 - uy * (r2 + 10);

  // Sweep radius for a gentle curve
  const sweepR = dist * 0.8;

  return `M ${sx} ${sy} A ${sweepR} ${sweepR} 0 0 1 ${ex} ${ey}`;
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
  const lineHeight = fontSize * 1.2;
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
          fontWeight="600"
          fill={fill}
        >
          {line}
        </text>
      ))}
    </>
  );
}

export default function FeedbackLoop({ className }: FeedbackLoopProps) {
  const total = NODES.length;
  const positions = NODES.map((_, i) => getNodePosition(i, total));

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 700 640"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[700px] mx-auto"
        role="img"
        aria-label="Positive feedback loop diagram showing deforestation-yield vicious cycle"
      >
        <rect width="700" height="640" fill="white" rx="8" />

        {/* Title */}
        <text
          x={CX}
          y="30"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill="#1a1a1a"
        >
          Fig 3.2 &mdash; Positive Feedback Loop: Deforestation-Yield Vicious
          Cycle
        </text>

        {/* Center label */}
        <text
          x={CX}
          y={CY - 12}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#6b7280"
        >
          VICIOUS
        </text>
        <text
          x={CX}
          y={CY + 6}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#6b7280"
        >
          CYCLE
        </text>
        {/* Circular arrow hint in center */}
        <path
          d={`M ${CX - 18} ${CY + 20} A 22 22 0 1 1 ${CX + 18} ${CY + 20}`}
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1.5"
          markerEnd="url(#centerArrow)"
        />

        <defs>
          {/* Arrow marker */}
          <marker
            id="flowArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#6b7280" />
          </marker>
          <marker
            id="centerArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#d1d5db" />
          </marker>
        </defs>

        {/* Arrows between consecutive nodes */}
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % total];
          const node = NODES[i];
          const nextNode = NODES[(i + 1) % total];
          const path = buildArrowPath(
            pos.x,
            pos.y,
            next.x,
            next.y,
            node.r,
            nextNode.r,
          );
          return (
            <path
              key={`arrow-${i}`}
              d={path}
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
              markerEnd="url(#flowArrow)"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const { x, y } = positions[i];
          return (
            <g key={`node-${i}`}>
              {/* Outer glow for the central impact node */}
              {i === 2 && (
                <circle
                  cx={x}
                  cy={y}
                  r={node.r + 4}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2"
                  strokeDasharray="4,3"
                  opacity="0.5"
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={node.r}
                fill={node.color}
                opacity="0.92"
              />
              <MultilineText
                text={node.label}
                x={x}
                y={y}
                fontSize={10}
                fill="white"
              />
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-zinc-500 italic leading-relaxed max-w-xl mx-auto">
        Source: Adapted from De Souza Batista et al., &ldquo;Deforestation
        Induced Changes in the Cerrado, Amazon and Atlantic Forest Water
        Balance&rdquo;
      </figcaption>
    </figure>
  );
}
