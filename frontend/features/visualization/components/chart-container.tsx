import React, { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  data,
  chartConfig,
} from "@/features/visualization/components/constants";
import { DataTable } from "@/features/visualization/components/data-table";

export function Visualization() {
  const [visualizationType, setVisualizationType] = useState<
    "line" | "bar" | "table"
  >("table");

  const handleClick = (type: "line" | "bar" | "table") => {
    setVisualizationType(type);
  };

  return (
    <Card className="h-full w-full overflow-y-scroll border-none">
      {visualizationType === "table" ? (
        <DataTable />
      ) : (
        <div className="h-full w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            {visualizationType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(11, 16)}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(11, 16)}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            )}
          </ChartContainer>
        </div>
      )}
    </Card>
  );
}
