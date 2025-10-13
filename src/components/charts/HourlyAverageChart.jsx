import Plot from "react-plotly.js";

export default function HourlyAverageChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available</p>;
  }

  const hourly = {};
  data.forEach((d) => {
    const hour = new Date(d.timestamp).getHours();
    hourly[hour] = hourly[hour] ? [...hourly[hour], d.dbfs_level] : [d.dbfs_level];
  });

  const avgData = Object.keys(hourly).map((h) => ({
    hour: h,
    avg: hourly[h].reduce((a, b) => a + b, 0) / hourly[h].length,
  }));

  const trace = {
    x: avgData.map((d) => d.hour),
    y: avgData.map((d) => d.avg),
    type: "bar",
    marker: { color: "#16a34a" },
  };

  const layout = {
    title: "Average Noise Level by Hour",
    xaxis: { title: "Hour of Day (0-23)" },
    yaxis: { title: "Avg dBFS" },
    plot_bgcolor: "white",
    paper_bgcolor: "white",
  };

  return <Plot data={[trace]} layout={layout} style={{ width: "100%" }} />;
}
