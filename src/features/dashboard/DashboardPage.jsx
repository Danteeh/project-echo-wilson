import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MetricsCard from "../../components/ui/MetricCard";
import DataTable from "../../components/ui/DataTable";

export default function DashboardPage({ data = [] }) {
  // Fechas iniciales (ajustadas al rango de los datos de prueba)
  const [startDate, setStartDate] = useState(new Date("2025-09-20T00:00:00"));
  const [endDate, setEndDate] = useState(new Date("2025-09-20T23:59:59"));
  const [filteredData, setFilteredData] = useState([]);

  // Filtrado por rango de fechas
  useEffect(() => {
    if (data.length > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filtered = data.filter(
        (d) => new Date(d.timestamp) >= start && new Date(d.timestamp) <= end
      );
      setFilteredData(filtered);
    }
  }, [data, startDate, endDate]);

  // Métricas principales
  const avgDbfs =
    filteredData.reduce((sum, d) => sum + d.dbfs_level, 0) /
    (filteredData.length || 1);
  const maxDbfs = Math.max(...filteredData.map((d) => d.dbfs_level || 0), 0);
  const medianDbfs =
    filteredData
      .map((d) => d.dbfs_level)
      .sort((a, b) => a - b)[Math.floor(filteredData.length / 2)] || 0;

  // Promedio por hora
  const hourlyAvg = Object.values(
    filteredData.reduce((acc, d) => {
      const hour = new Date(d.timestamp).getHours();
      if (!acc[hour]) acc[hour] = { hour, total: 0, count: 0 };
      acc[hour].total += d.dbfs_level;
      acc[hour].count += 1;
      return acc;
    }, {})
  ).map((h) => ({ hour: h.hour, dbfs: h.total / h.count }));

  // Gráfico de serie temporal
  const timeSeriesChart = (
    <div className="chart-container">
      <LineChart width={1000} height={300} data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" hide />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="dbfs_level"
          stroke="#0055cc"
          dot={false}
        />
      </LineChart>
    </div>
  );

  // Gráfico de promedio por hora
  const hourlyBarChart = (
    <div className="chart-container">
      <BarChart width={500} height={300} data={hourlyAvg}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="dbfs" fill="#0055cc" />
      </BarChart>
    </div>
  );

  // Gráfico de frecuencia dominante
  const scatterFreq =
    filteredData.filter((d) => d.dominant_frequency !== null).length > 0 ? (
      <div className="chart-container">
        <ScatterChart width={500} height={300}>
          <CartesianGrid />
          <XAxis dataKey="timestamp" hide />
          <YAxis dataKey="dominant_frequency" />
          <Tooltip />
          <Scatter
            data={filteredData}
            fill="#cc0000"
            line={{ stroke: "#cc0000", strokeWidth: 1 }}
          />
        </ScatterChart>
      </div>
    ) : null;

  return (
    <div className="container">
      {/* Encabezado */}
      <header style={{ marginBottom: "2rem" }}>
        <h1>Dashboard Interactivo de Datos de Ruido</h1>
        <p>Analiza las mediciones de ruido ambiental en detalle.</p>
      </header>

      {/* Filtros */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2>Filtros</h2>
        <div className="filters">
          <div className="filter-item">
            <label>Fecha de inicio</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          <div className="filter-item">
            <label>Fecha de fin</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          <button onClick={() => setFilteredData(filteredData)}>
            Refrescar datos
          </button>
        </div>
      </section>

      {/* Métricas */}
      <section
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <MetricsCard
          label="Nivel Promedio (dBFS)"
          value={avgDbfs.toFixed(2)}
        />
        <MetricsCard label="Mediana (dBFS)" value={medianDbfs.toFixed(2)} />
        <MetricsCard label="Pico Máximo" value={maxDbfs.toFixed(2)} />
        <MetricsCard
          label="Total de Registros"
          value={filteredData.length.toLocaleString()}
        />
      </section>

      {/* Gráficos */}
      <section>
        <h2>Análisis Temporal</h2>
        {timeSeriesChart}
      </section>

      <section>
        <h2>Promedio por Hora del Día</h2>
        {hourlyBarChart}
      </section>

      {scatterFreq && (
        <section>
          <h2>Frecuencia Dominante</h2>
          {scatterFreq}
        </section>
      )}

      {/* Tabla */}
      <section>
        <h2>Datos Detallados</h2>
        <DataTable data={filteredData} />
      </section>
    </div>
  );
}
