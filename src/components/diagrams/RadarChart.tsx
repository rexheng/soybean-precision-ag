"use client";

import React, { useState, useEffect } from "react";
import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarChartProps {
  className?: string;
}

const data = [
  { axis: "power-over", corporations: 7, government: 8 },
  { axis: "power to initiate", corporations: 6, government: 7 },
  { axis: "soft power", corporations: 7, government: 3 },
  { axis: "power with", corporations: 4, government: 2 },
  { axis: "power to resist", corporations: 7, government: 4 },
  { axis: "hard power", corporations: 8, government: 3 },
];

const COLORS = {
  corporations: "#3d7a2a",
  government: "#888888",
} as const;

export default function RadarChart({ className }: RadarChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <figure
      className={`bg-white rounded-xl p-6 ${className ?? ""}`}
    >
      <div style={{ width: "100%", height: 420 }}>
      {!mounted ? (
        <div className="flex items-center justify-center h-full text-sm text-zinc-400">Loading chart...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart
            data={data}
            margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          >
            <PolarGrid stroke="#d1d5db" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fontSize: 12, fill: "#374151" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 8]}
              tickCount={5}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
            />
            <Radar
              name="Corporations (Cargill)"
              dataKey="corporations"
              stroke={COLORS.corporations}
              strokeOpacity={0.8}
              fill={COLORS.corporations}
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Radar
              name="Government"
              dataKey="government"
              stroke={COLORS.government}
              strokeOpacity={0.8}
              fill={COLORS.government}
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Tooltip />
          </RechartsRadarChart>
        </ResponsiveContainer>
      )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded-sm border"
            style={{
              backgroundColor: COLORS.corporations,
              opacity: 0.55,
              borderColor: COLORS.corporations,
            }}
          />
          <span className="text-sm text-zinc-700">Corporations (Cargill)</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded-sm border"
            style={{
              backgroundColor: COLORS.government,
              opacity: 0.55,
              borderColor: COLORS.government,
            }}
          />
          <span className="text-sm text-zinc-700">Government</span>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs text-zinc-500 italic leading-relaxed">
        Figure 3.1: Power Radar Chart [Winhall and Leadbeater, &ldquo;Power to
        shift a system.&rdquo;]
      </figcaption>
    </figure>
  );
}
