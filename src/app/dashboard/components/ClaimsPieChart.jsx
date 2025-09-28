"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function ClaimsPieChart({ completed, remaining }) {
  return (
    <div className="rounded-xl bg-white p-4">
        <Plot
          data={[
            {
              values: [completed, remaining],
              labels: ["Completed", "Remaining"],
              type: "pie",
              marker: {
                colors: ["#3B82F6", "#E5E7EB"],
                line: { color: "white", width: 2 },
              },
              textinfo: "label+percent",
            },
          ]}
          layout={{
            autosize: true,
            margin: { t: 20, b: 20, l: 20, r: 20 },
            showlegend: false,
            paper_bgcolor: "transparent", // outer background transparent
          }}
          config={{ displayModeBar: false }}
          style={{ width: "100%", height: "300px" }}
        />
    </div>
  );
}
