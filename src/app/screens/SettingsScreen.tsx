import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "next-themes";
import { User, Moon, Cpu, Thermometer, Droplets, LogOut, ChevronRight, Wifi, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNav } from "../components/BottomNav";

export function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";
  const [simEnabled, setSimEnabled] = useState(true);
  const [simTemp, setSimTemp] = useState(28);
  const [simHumidity, setSimHumidity] = useState(65);

  const handleLogout = () => {
    navigate("/login");
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void; }) => (
    <motion.div
      onClick={onChange}
      animate={{
        background: value ? "#22C55E" : "#CBD5E1",
        boxShadow: value ? "0px 2px 8px rgba(34,197,94,0.35)" : "none"
      }}
      initial={false}
      transition={{ duration: 0.2 }}
      style={{
        width: "48px", height: "28px", borderRadius: "14px", cursor: "pointer",
        position: "relative", flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: value ? 20 : 0 }}
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          position: "absolute", top: "3px", left: "3px", width: "22px", height: "22px",
          borderRadius: "50%", background: "white", boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        }}
      />
    </motion.div>
  );

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
          padding: "56px 20px 16px",
          background: "#FFFFFF",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: 700, color: "#1E293B" }}>Profil & Pengaturan</span>
      </div>

      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Profile Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
            borderRadius: "20px",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0px 6px 20px rgba(59,130,246,0.3)",
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid rgba(255,255,255,0.4)",
              }}
            >
              <User size={36} color="white" strokeWidth={1.5} />
            </div>
            {/* Online Dot */}
            <div
              style={{
                position: "absolute",
                bottom: "3px",
                right: "3px",
                width: "16px",
                height: "16px",
                background: "#22C55E",
                borderRadius: "50%",
                border: "2.5px solid white",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "3px" }}>
              Operator Sistem
            </p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>ID: 25051204370</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                borderRadius: "8px",
                padding: "5px 12px",
                fontSize: "12px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Wifi size={12} />
              Terhubung
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                borderRadius: "8px",
                padding: "5px 12px",
                fontSize: "12px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Shield size={12} />
              Admin
            </span>
          </div>
        </div>

        {/* Preferensi Group */}
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#94A3B8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Preferensi
          </p>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Dark Mode */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 18px",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    background: "#F1F5F9",
                    borderRadius: "10px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Moon size={18} color="#6366F1" strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>Mode Gelap</p>
                  <p style={{ fontSize: "12px", color: "#94A3B8" }}>Tampilan gelap untuk mata</p>
                </div>
              </div>
              <Toggle value={darkMode} onChange={() => setTheme(darkMode ? "light" : "dark")} />
            </div>

            {/* Notifications */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    background: "#FFF7ED",
                    borderRadius: "10px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🔔</span>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>Notifikasi Peringatan</p>
                  <p style={{ fontSize: "12px", color: "#94A3B8" }}>Alert kondisi kritis</p>
                </div>
              </div>
              <ChevronRight size={16} color="#CBD5E1" />
            </div>
          </div>
        </div>

        {/* Developer Mode Group */}
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#94A3B8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Mode Pengembang
          </p>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "18px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Enable Simulation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    background: simEnabled ? "#EFF6FF" : "#F1F5F9",
                    borderRadius: "10px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s",
                  }}
                >
                  <Cpu size={18} color={simEnabled ? "#3B82F6" : "#94A3B8"} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>Aktifkan Simulasi Sensor</p>
                  <p style={{ fontSize: "12px", color: "#94A3B8" }}>Override data sensor nyata</p>
                </div>
              </div>
              <Toggle value={simEnabled} onChange={() => setSimEnabled(!simEnabled)} />
            </div>

            <AnimatePresence initial={false}>
              {simEnabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div
                    style={{
                      height: "1px",
                      background: "#F1F5F9",
                      margin: "0 -4px",
                    }}
                  />

                  {/* Temperature Slider */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Thermometer size={16} color="#F97316" strokeWidth={2} />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#1E293B" }}>
                          Manipulasi Suhu
                        </span>
                      </div>
                      <span
                        style={{
                          background: "#FFF7ED",
                          color: "#F97316",
                          borderRadius: "8px",
                          padding: "3px 10px",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      >
                        {simTemp}°C
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={simTemp}
                      onChange={(e) => setSimTemp(Number(e.target.value))}
                      style={{
                        width: "100%",
                        accentColor: "#F97316",
                        height: "6px",
                        cursor: "pointer",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: "#CBD5E1" }}>0°C</span>
                      <span style={{ fontSize: "11px", color: "#CBD5E1" }}>50°C</span>
                    </div>
                  </div>

                  {/* Humidity Slider */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Droplets size={16} color="#3B82F6" strokeWidth={2} />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#1E293B" }}>
                          Manipulasi Kelembaban
                        </span>
                      </div>
                      <span
                        style={{
                          background: "#EFF6FF",
                          color: "#3B82F6",
                          borderRadius: "8px",
                          padding: "3px 10px",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      >
                        {simHumidity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={simHumidity}
                      onChange={(e) => setSimHumidity(Number(e.target.value))}
                      style={{
                        width: "100%",
                        accentColor: "#3B82F6",
                        height: "6px",
                        cursor: "pointer",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: "#CBD5E1" }}>0%</span>
                      <span style={{ fontSize: "11px", color: "#CBD5E1" }}>100%</span>
                    </div>
                  </div>

                  {/* Preview Box */}
                  <div
                    style={{
                      background: "#F8F9FA",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      border: "1px dashed #CBD5E1",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#94A3B8", marginBottom: "2px" }}>Suhu Sim.</p>
                      <p style={{ fontSize: "18px", fontWeight: 800, color: "#F97316" }}>{simTemp}°C</p>
                    </div>
                    <div style={{ width: "1px", background: "#E2E8F0" }} />
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#94A3B8", marginBottom: "2px" }}>RH Sim.</p>
                      <p style={{ fontSize: "18px", fontWeight: 800, color: "#3B82F6" }}>{simHumidity}%</p>
                    </div>
                    <div style={{ width: "1px", background: "#E2E8F0" }} />
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "10px", color: "#94A3B8", marginBottom: "2px" }}>Kipas</p>
                      <p style={{ fontSize: "13px", fontWeight: 800, color: simTemp > 25 ? "#22C55E" : "#64748B" }}>
                        {simTemp > 25 ? "ON" : "OFF"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* App Info */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            padding: "14px 18px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "#64748B" }}>Versi Aplikasi</span>
          <span
            style={{
              background: "#F1F5F9",
              borderRadius: "8px",
              padding: "3px 10px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#475569",
            }}
          >
            v1.2.0 Beta
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            background: "transparent",
            border: "2px solid #FCA5A5",
            cursor: "pointer",
            color: "#EF4444",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <LogOut size={18} strokeWidth={2} />
          Keluar (Logout)
        </button>
      </div>

      <BottomNav />
    </div>
  );
}