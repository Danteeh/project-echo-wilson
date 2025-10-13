import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DropdownMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="dropdown">
            <button
                className="dropdown-toggle"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                type="button"
            >
                Menú
            </button>

            {open && (
                <div className="dropdown-menu" role="menu">
                    <Link to="/" className="dropdown-item" onClick={() => setOpen(false)}>Dashboard</Link>
                    <Link to="/calendar" className="dropdown-item" onClick={() => setOpen(false)}>Calendario</Link>
                    <Link to="/about" className="dropdown-item" onClick={() => setOpen(false)}>Sobre el Proyecto</Link>
                </div>
            )}
        </div>
    );
}
