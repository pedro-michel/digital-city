import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Header() {
  const [status, setStatus] = useState<"unknown" | "ok" | "error">("unknown");

  useEffect(() => {
    api
      .get("/health")
      .then(() => setStatus("ok"))
      .catch((err) => {
        console.error("Health check failed:", err);
        setStatus("error");
      });
  }, []);

  const statusColor =
    status === "ok" ? "#16a34a" : status === "error" ? "#dc2626" : "#6b7280";
  const statusText =
    status === "ok"
      ? "Connected to API"
      : status === "error"
      ? "API connection error"
      : "Checking API…";

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: "0.75rem"
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Smart Waste Management – PUC Campinas
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "999px",
            backgroundColor: statusColor
          }}
        />
        <span
          style={{ fontSize: "0.9rem", color: "#4b5563" }}
          aria-live="polite"
        >
          {statusText}
        </span>
      </div>
    </header>
  );
}

