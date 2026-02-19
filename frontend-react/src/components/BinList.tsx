import { useBins } from "../hooks/useBins";

export function BinList() {
  const { bins, loading, error, isMock } = useBins();

  if (loading) {
    return <p>Loading bins…</p>;
  }

  if (error) {
    return (
      <div style={{ color: "#b91c1c", padding: "1rem", border: "1px solid #fecaca", borderRadius: "0.5rem", backgroundColor: "#fef2f2" }}>
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Failed to load bins</p>
        <p style={{ fontSize: "0.9rem" }}>
          Make sure the API is running on localhost:8000. Error: {error.message || "Unknown error"}
        </p>
      </div>
    );
  }

  const binsList = Array.isArray(bins) ? bins : [];

  if (binsList.length === 0 && !loading) {
    return (
      <section>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
          Lixeiras
        </h2>
        <p style={{ color: "#6b7280" }}>Nenhuma lixeira encontrada.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
        Lixeiras {isMock && <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "#6b7280" }}>(dados mock – API offline)</span>}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem"
        }}
      >
        {binsList.map((bin) => {
          const isFull = bin.fill_level >= 90;
          const color = isFull ? "#dc2626" : "#16a34a";

          return (
            <article
              key={bin.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "0.9rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.25rem"
                }}
              >
                <h3 style={{ fontWeight: 600 }}>{bin.name}</h3>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    backgroundColor: color
                  }}
                  title={isFull ? "Full (red)" : "Not full (green)"}
                />
              </div>
              <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                {bin.location}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                Fill level: <strong>{bin.fill_level}%</strong>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

