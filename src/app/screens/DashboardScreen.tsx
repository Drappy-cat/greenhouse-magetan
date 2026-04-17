import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, Wind, Flame, ThermometerSun, Droplets, CloudSun } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

export function DashboardScreen() {
  const navigate = useNavigate();
  const [setpoint, setSetpoint] = useState(25);

  const decrement = () => setSetpoint((p) => Math.max(0, p - 1));
  const increment = () => setSetpoint((p) => Math.min(50, p + 1));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "80px",
      }}
    >
      {/* Top App Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 20px 16px",
          background: "#FFFFFF",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: 700, color: "#1E293B" }}>Beranda</span>
        <button
          onClick={() => navigate("/notifications")}
          style={{
            background: "#F1F5F9",
            border: "none",
            borderRadius: "12px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Bell size={20} color="#1E293B" strokeWidth={1.8} />
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "8px",
              height: "8px",
              background: "#F97316",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </button>
      </div>

      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Hero Card - Climate */}
        <div
          style={{
            background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 60%, #60A5FA 100%)",
            borderRadius: "24px",
            padding: "24px 20px 20px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0px 8px 24px rgba(59, 130, 246, 0.35)",
          }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "130px",
              height: "130px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-30px",
              width: "160px",
              height: "160px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50%",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 400, opacity: 0.8, marginBottom: "4px" }}>Suhu Real-time</p>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
                <span style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1, letterSpacing: "-2px" }}>28</span>
                <span style={{ fontSize: "28px", fontWeight: 600, marginTop: "10px", opacity: 0.9 }}>°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                <Droplets size={15} style={{ opacity: 0.8 }} />
                <span style={{ fontSize: "14px", fontWeight: 500, opacity: 0.85 }}>Kelembaban 65%</span>
              </div>
            </div>

            {/* Weather Icon */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "20px",
                  padding: "16px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <CloudSun size={40} color="white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={{ marginTop: "18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  fontSize: "12px",
                  fontWeight: 400,
                  opacity: 0.8,
                }}
              >
                Senin, 13 Apr 2026
              </span>
            </div>
            <span
              style={{
                background: "#22C55E",
                color: "white",
                borderRadius: "20px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 700,
                boxShadow: "0px 2px 8px rgba(34, 197, 94, 0.4)",
              }}
            >
              ✓ Kondisi Stabil
            </span>
          </div>
        </div>

        {/* Fuzzy Logic Card */}
        <div
          style={{
            background: "#EFF6FF",
            borderRadius: "16px",
            padding: "18px",
            border: "1px solid #DBEAFE",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div
              style={{
                background: "#3B82F6",
                borderRadius: "8px",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "white", fontSize: "13px", fontWeight: 800 }}>AI</span>
            </div>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#1E3A8A" }}>Transparansi Fuzzy Logic</span>
          </div>
          <p style={{ fontSize: "13.5px", fontWeight: 400, color: "#1E40AF", lineHeight: "1.55" }}>
            Sensor membaca suhu{" "}
            <span style={{ fontWeight: 700, background: "#BFDBFE", borderRadius: "4px", padding: "1px 5px" }}>PANAS</span>{" "}
            dan kelembaban{" "}
            <span style={{ fontWeight: 700, background: "#BFDBFE", borderRadius: "4px", padding: "1px 5px" }}>NORMAL</span>.
            <br />
            Keputusan inferensi: <strong>Kipas ON</strong>, Pemanas OFF.
          </p>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#DBEAFE",
                color: "#1E40AF",
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              Rule #3 Aktif
            </span>
            <span
              style={{
                background: "#DBEAFE",
                color: "#1E40AF",
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              Confidence: 87%
            </span>
          </div>
        </div>

        {/* Setpoint Control Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <ThermometerSun size={18} color="#3B82F6" strokeWidth={2} />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B" }}>Atur Target Suhu</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              onClick={decrement}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#F1F5F9",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 300,
                color: "#64748B",
                transition: "background 0.15s",
              }}
            >
              −
            </button>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "48px", fontWeight: 800, color: "#1E293B", letterSpacing: "-2px" }}>
                {setpoint}
              </span>
              <span style={{ fontSize: "22px", fontWeight: 600, color: "#64748B" }}>°C</span>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>Target Setpoint</p>
            </div>
            <button
              onClick={increment}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#3B82F6",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 300,
                color: "white",
                boxShadow: "0px 4px 10px rgba(59,130,246,0.35)",
                transition: "background 0.15s",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Actuators Grid */}
        <div>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B", marginBottom: "10px" }}>Status Aktuator</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {/* Fan Card - ON */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "18px 14px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                border: "1.5px solid #D1FAE5",
              }}
            >
              <div
                style={{
                  background: "#F0FDF4",
                  borderRadius: "14px",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Wind size={26} color="#22C55E" strokeWidth={1.8} />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#475569", textAlign: "center" }}>
                Kipas Sirkulasi
              </span>
              <span
                style={{
                  background: "#22C55E",
                  color: "white",
                  borderRadius: "20px",
                  padding: "4px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  boxShadow: "0px 2px 6px rgba(34,197,94,0.3)",
                }}
              >
                ON
              </span>
            </div>

            {/* Heater Card - OFF */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "18px 14px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                border: "1.5px solid #F1F5F9",
              }}
            >
              <div
                style={{
                  background: "#F8F9FA",
                  borderRadius: "14px",
                  width: "52px",
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Flame size={26} color="#64748B" strokeWidth={1.8} />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#475569", textAlign: "center" }}>
                Pemanas
              </span>
              <span
                style={{
                  background: "#64748B",
                  color: "white",
                  borderRadius: "20px",
                  padding: "4px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                OFF
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}