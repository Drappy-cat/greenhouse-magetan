import { useState } from "react";
import { Plus, Sun, Moon, Clock } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface Schedule {
  id: number;
  title: string;
  time: string;
  targetTemp: number;
  icon: typeof Sun;
  iconColor: string;
  iconBg: string;
  active: boolean;
}

export function ScheduleScreen() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      title: "Jadwal Siang",
      time: "06:00 – 18:00",
      targetTemp: 24,
      icon: Sun,
      iconColor: "#F97316",
      iconBg: "#FFF7ED",
      active: true,
    },
    {
      id: 2,
      title: "Jadwal Malam",
      time: "18:00 – 06:00",
      targetTemp: 27,
      icon: Moon,
      iconColor: "#6366F1",
      iconBg: "#EEF2FF",
      active: false,
    },
  ]);

  const toggleSchedule = (id: number) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "80px",
        position: "relative",
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
        <span style={{ fontSize: "20px", fontWeight: 700, color: "#1E293B" }}>Jadwal Operasional</span>
        <p style={{ fontSize: "13px", color: "#94A3B8", marginTop: "3px" }}>
          Kelola jadwal otomasi greenhouse
        </p>
      </div>

      {/* Summary Row */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "4px" }}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "12px 14px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Clock size={18} color="#3B82F6" />
            <div>
              <p style={{ fontSize: "11px", color: "#94A3B8" }}>Jadwal Aktif</p>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#1E293B" }}>
                {schedules.filter((s) => s.active).length} / {schedules.length}
              </p>
            </div>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "12px 14px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{ width: "8px", height: "8px", background: "#22C55E", borderRadius: "50%" }} />
            <div>
              <p style={{ fontSize: "11px", color: "#94A3B8" }}>Status</p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#22C55E" }}>Berjalan</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B" }}>Daftar Jadwal</p>

        {schedules.map((schedule) => {
          const Icon = schedule.icon;
          return (
            <div
              key={schedule.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                border: schedule.active ? "1.5px solid #D1FAE5" : "1.5px solid #F1F5F9",
                transition: "border 0.3s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "14px", flex: 1 }}>
                  {/* Icon */}
                  <div
                    style={{
                      background: schedule.iconBg,
                      borderRadius: "14px",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} color={schedule.iconColor} strokeWidth={2} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#1E293B", marginBottom: "6px" }}>
                      {schedule.title}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Clock size={13} color="#94A3B8" />
                        <span style={{ fontSize: "13px", color: "#64748B" }}>Waktu: {schedule.time}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "13px", color: "#64748B" }}>
                          🌡 Suhu Target: <strong>{schedule.targetTemp}°C</strong>
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div style={{ marginTop: "10px" }}>
                      <span
                        style={{
                          background: schedule.active ? "#DCFCE7" : "#F1F5F9",
                          color: schedule.active ? "#16A34A" : "#64748B",
                          borderRadius: "8px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {schedule.active ? "● Aktif" : "○ Nonaktif"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* iOS-style Toggle */}
                <div
                  onClick={() => toggleSchedule(schedule.id)}
                  style={{
                    width: "48px",
                    height: "28px",
                    borderRadius: "14px",
                    background: schedule.active ? "#22C55E" : "#CBD5E1",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.3s ease",
                    flexShrink: 0,
                    boxShadow: schedule.active ? "0px 2px 8px rgba(34,197,94,0.4)" : "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: schedule.active ? "23px" : "3px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "white",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                      transition: "left 0.3s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Info Card */}
        <div
          style={{
            background: "#EFF6FF",
            borderRadius: "14px",
            padding: "14px 16px",
            border: "1px solid #DBEAFE",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "16px" }}>💡</span>
          <p style={{ fontSize: "12px", color: "#1E40AF", lineHeight: "1.5" }}>
            Jadwal operasional menggunakan modul RTC DS3231 untuk akurasi waktu yang presisi meskipun tanpa koneksi internet.
          </p>
        </div>
      </div>

      {/* FAB - Add */}
      <button
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          background: "#3B82F6",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 6px 16px rgba(59,130,246,0.45)",
          zIndex: 50,
        }}
      >
        <Plus size={24} color="white" strokeWidth={2.5} />
      </button>

      <BottomNav />
    </div>
  );
}
