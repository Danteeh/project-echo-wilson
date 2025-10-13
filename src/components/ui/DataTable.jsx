import React from "react";

export default function DataTable({ data = [] }) {
    if (!data || data.length === 0) {
        return (
            <div className="card">
                <p>No hay datos disponibles.</p>
            </div>
        );
    }

    return (
        <div className="card" style={{ overflowX: "auto" }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Archivo</th>
                        <th style={{ textAlign: "right" }}>Nivel dBFS</th>
                        <th style={{ textAlign: "right" }}>Frecuencia Dominante (Hz)</th>
                        <th style={{ textAlign: "right" }}>Energía RMS</th>
                        <th style={{ textAlign: "right" }}>Centroid Espectral</th>
                        <th style={{ textAlign: "right" }}>Rolloff</th>
                        <th style={{ textAlign: "right" }}>Zero Crossing</th>
                        <th style={{ textAlign: "right" }}>Duración (s)</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{new Date(d.timestamp).toLocaleString()}</td>
                            <td>{d.filename || "-"}</td>
                            <td style={{ textAlign: "right" }}>
                                {d.dbfs_level?.toFixed(2)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {d.dominant_frequency?.toFixed(2)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {d.rms_energy?.toExponential(2)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {d.spectral_centroid?.toFixed(1)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {d.spectral_rolloff?.toFixed(1)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {d.zero_crossing_rate?.toFixed(4)}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {d.duration?.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
