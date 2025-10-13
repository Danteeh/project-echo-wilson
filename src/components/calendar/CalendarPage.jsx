import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarPage({ records = [] }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayRecords, setDayRecords] = useState([]);

    useEffect(() => {
        if (records.length > 0) {
            const day = selectedDate.toDateString();
            const filtered = records.filter((r) => {
                const recordDate = new Date(r.timestamp).toDateString();
                return recordDate === day;
            });
            setDayRecords(filtered);
        }
    }, [records, selectedDate]);

    return (
        <div className="container">
            {/* Encabezado */}
            <header style={{ marginBottom: "2rem" }}>
                <h1>Calendario de Registros</h1>
                <p>Selecciona una fecha para ver los registros correspondientes.</p>
            </header>

            {/* Selector de fecha */}
            <section className="card">
                <h2>Seleccionar fecha</h2>
                <div className="filters">
                    <div className="filter-item">
                        <label>Fecha</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="PPP"
                        />
                    </div>
                </div>
            </section>

            {/* Registros del día */}
            <section className="card">
                <h2>Registros del {selectedDate.toLocaleDateString()}</h2>

                {dayRecords.length === 0 ? (
                    <p>No hay registros para esta fecha.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Nivel dBFS</th>
                                <th>Frecuencia dominante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dayRecords.map((r, idx) => (
                                <tr key={idx}>
                                    <td>
                                        {new Date(r.timestamp).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td>{r.dbfs_level.toFixed(2)}</td>
                                    <td>{r.dominant_frequency || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
