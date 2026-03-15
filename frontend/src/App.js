import { useState } from "react";
import axios from "axios";
import lightBg from "./light-bg.jpg";

const theme = {
  card: "rgba(255,255,255,0.25)",
  border: "rgba(255,255,255,0.5)",
  text: "#0a0015",
  subtext: "#2d0052",
  input: "rgba(255,255,255,0.35)",
  button: "linear-gradient(135deg, #c026d3, #7c3aed)",
  resultCard: "rgba(255,255,255,0.2)",
};

export default function App() {
  const [ip, setIp] = useState("");
  const [startPort, setStartPort] = useState("");
  const [endPort, setEndPort] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!ip || !startPort || !endPort) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResults([]);
    try {
      const response = await axios.post("http://127.0.0.1:5000/scan", {
        ip,
        start_port: startPort,
        end_port: endPort,
      });
      setResults(response.data);
    } catch (e) {
      setError("Failed to connect to scanner. Is Flask running?");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${lightBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px",
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* Main Card */}
      <div style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "600px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}>
        <h1 style={{ color: theme.text, fontSize: "28px", marginBottom: "8px" }}>🔍 Port Scanner</h1>
        <p style={{ color: theme.subtext, marginBottom: "30px" }}>Scan open ports on any IP address</p>

        {[
          { label: "Target IP", value: ip, set: setIp, placeholder: "e.g. 127.0.0.1" },
          { label: "Start Port", value: startPort, set: setStartPort, placeholder: "e.g. 1" },
          { label: "End Port", value: endPort, set: setEndPort, placeholder: "e.g. 1000" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label} style={{ marginBottom: "16px" }}>
            <label style={{ color: theme.subtext, fontSize: "13px", display: "block", marginBottom: "6px" }}>{label}</label>
            <input
              value={value}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${theme.border}`,
                background: theme.input,
                color: theme.text,
                fontSize: "15px",
                outline: "none",
                backdropFilter: "blur(10px)",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}

        {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}

        <button onClick={handleScan} disabled={loading} style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          background: theme.button,
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s",
        }}>
          {loading ? "Scanning..." : "Start Scan"}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{ width: "100%", maxWidth: "600px", marginTop: "30px" }}>
          <p style={{ color: theme.text, marginBottom: "12px", fontSize: "14px", fontWeight: "600" }}>
            Found {results.length} open port{results.length > 1 ? "s" : ""}
          </p>
          {results.map((r, i) => (
            <div key={i} style={{
              background: theme.resultCard,
              border: `1px solid ${theme.border}`,
              borderRadius: "12px",
              padding: "16px 20px",
              marginBottom: "10px",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ color: "#7c3aed", fontWeight: "700", fontSize: "18px" }}>:{r.port}</span>
              <span style={{ color: theme.text, fontSize: "15px" }}>{r.service}</span>
              <span style={{
                background: "rgba(124,58,237,0.15)",
                color: "#7c3aed",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
              }}>OPEN</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}