"use client";

import React from "react";

interface FeedbackLoopProps {
  className?: string;
}

interface Node {
  label: string;
  color: string;
  r: number;
}

const NODES: Node[] = [
  { label: "Deforestation", color: "#6B2226", r: 36 },
  { label: "Altered Rainfall\nPatterns", color: "#D97B2B", r: 32 },
  { label: "Crop Yields\nDecline", color: "#CC2936", r: 50 },
  { label: "Farm Incomes\nFall", color: "#D97B2B", r: 32 },
  { label: "State Revenue\nDeclines", color: "#D97B2B", r: 32 },
  { label: "Loss for Bond\nInvestors", color: "#C05E24", r: 32 },
  { label: "Supply Chain\nLosses", color: "#D97B2B", r: 32 },
  { label: "Loss in Export\nRevenue", color: "#D97B2B", r: 32 },
  { label: "Cargill is\nAffected", color: "#2E7D32", r: 34 },
  { label: "More Land\nClearing", color: "#6B2226", r: 32 },
];

const CX = 360;
const CY = 330;
const ORBIT = 230;

function nodePos(index: number, total: number): { x: number; y: number } {
  const angle = ((2 * Math.PI) / total) * index - Math.PI / 2;
  return {
    x: CX + ORBIT * Math.cos(angle),
    y: CY + ORBIT * Math.sin(angle),
  };
}

/**
 * Build a curved SVG path between two node edges.
 * Uses a quadratic bezier with a control point offset perpendicular
 * to the line between nodes, curving clockwise.
 */
function curvedArrowPath(
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
  if (dist === 0) return "";
  const ux = dx / dist;
  const uy = dy / dist;

  // Start/end at node edges
  const gap = 5;
  const sx = x1 + ux * (r1 + gap);
  const sy = y1 + uy * (r1 + gap);
  const ex = x2 - ux * (r2 + gap + 6);
  const ey = y2 - uy * (r2 + gap + 6);

  // Perpendicular offset for clockwise curve (rotate unit vector -90 degrees)
  const perpX = uy;
  const perpY = -ux;
  const curvature = dist * 0.2;
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

export default function FeedbackLoop({ className }: FeedbackLoopProps) {
  const total = NODES.length;
  const positions = NODES.map((_, i) => nodePos(i, total));

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
        viewBox="0 0 720 680"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[720px] mx-auto"
        role="img"
        aria-label="Positive feedback loop diagram showing deforestation-yield vicious cycle"
      >
        <defs>
          {/* Arrowhead marker */}
          <marker
            id="feedbackArrow"
            viewBox="0 0 12 10"
            refX="10"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M 0 1 L 12 5 L 0 9 L 3 5 Z" fill="#555" />
          </marker>

          {/* Drop shadow for nodes */}
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000"
              floodOpacity="0.15"
            />
          </filter>

          {/* Center circular arrow icon */}
          <marker
            id="centerLoopArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 1 L 10 5 L 0 9 Z" fill="#9CA3AF" />
          </marker>
        </defs>

        {/* Curved arrows between consecutive nodes */}
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % total];
          const node = NODES[i];
          const nextNode = NODES[(i + 1) % total];
          const d = curvedArrowPath(
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
              d={d}
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#feedbackArrow)"
            />
          );
        })}

        {/* Center "VICIOUS CYCLE" label */}
        <text
          x={CX}
          y={CY - 16}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#6B7280"
          letterSpacing="0.12em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          VICIOUS
        </text>
        <text
          x={CX}
          y={CY + 2}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#6B7280"
          letterSpacing="0.12em"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          CYCLE
        </text>
        {/* Circular arrow icon beneath text */}
        <path
          d={`M ${CX - 20} ${CY + 22} A 24 24 0 1 1 ${CX + 16} ${CY + 24}`}
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          markerEnd="url(#centerLoopArrow)"
        />

        {/* Nodes: circles + labels */}
        {NODES.map((node, i) => {
          const { x, y } = positions[i];
          return (
            <g key={`node-${i}`} filter="url(#nodeShadow)">
              <circle cx={x} cy={y} r={node.r} fill={node.color} />
              <MultilineText
                text={node.label}
                x={x}
                y={y}
                fontSize={node.r >= 44 ? 11 : 9.5}
                fill="white"
              />
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-center text-xs text-zinc-500 italic leading-relaxed max-w-xl mx-auto">
        <strong className="not-italic text-zinc-600">Fig 3.2</strong>
        {" "}Positive Feedback Loop: Deforestation-Yield Vicious Cycle.
        Source: Adapted from De Souza Batista et al., &ldquo;Deforestation
        Induced Changes in the Cerrado, Amazon and Atlantic Forest Water
        Balance&rdquo;
      </figcaption>
    </figure>
  );
}
