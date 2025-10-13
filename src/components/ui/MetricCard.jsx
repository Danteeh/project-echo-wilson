import React from "react";

export default function MetricsCard({ label, value }) {
    return (
        <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
    );
}
