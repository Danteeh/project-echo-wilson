import Plot from "react-plotly.js";

export default function TimeSeriesChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available</p>;
  }

  const trace = {
    x: data.map((d) => d.timestamp),
    y: data.map((d) => d.dbfs_level),
    type: "scatter",
    mode: "lines+markers",
    line: { color: "#2563eb", width: 2 },
    marker: { color: "#1d4ed8" },
    name: "dBFS",
  };

  const layout = {
    title: "Noise Level Over Time (dBFS)",
    xaxis: { title: "Timestamp" },
    yaxis: { title: "dBFS Level" },
    hovermode: "x unified",
    plot_bgcolor: "white",
    paper_bgcolor: "white",
  };

  return <Plot data={[trace]} layout={layout} style={{ width: "100%" }} />;
}
