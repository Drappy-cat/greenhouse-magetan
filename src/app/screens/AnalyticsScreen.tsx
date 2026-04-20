import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download, Wind, Flame, AlertTriangle, Calendar, X } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

const chartData = [
  { time: "06:00", suhu: 22, kelembaban: 72 },
  { time: "08:00", suhu: 24, kelembaban: 68 },
  { time: "10:00", suhu: 27, kelembaban: 60 },
  { time: "12:00", suhu: 30, kelembaban: 55 },
  { time: "14:00", suhu: 28, kelembaban: 63 },
  { time: "16:00", suhu: 26, kelembaban: 67 },
  { time: "18:00", suhu: 24, kelembaban: 70 },
];

const activityLog = [
  {
    id: 1,
    icon: Wind,
    iconColor: "#22C55E",
    iconBg: "#F0FDF4",
    time: "14:05 WIB",
    desc: "Suhu ruangan mencapai 30°C. Kipas sirkulasi otomatis diaktifkan.",
    type: "success",
  },
  {
    id: 2,
    icon: AlertTriangle,
    iconColor: "#F97316",
    iconBg: "#FFF7ED",
    time: "11:30 WIB",
    desc: "Kelembaban turun ke 55%. Sistem mencatat kondisi di luar batas optimal.",
    type: "warning",
  },
  {
    id: 3,
    icon: Flame,
    iconColor: "#64748B",
    iconBg: "#F8F9FA",
    time: "06:15 WIB",
    desc: "Pemanas dinonaktifkan. Suhu pagi mencapai target 24°C.",
    type: "info",
  },
];

const filters = ["Hari Ini", "7 Hari", "30 Hari", "Lainnya"];
const activityFilters = ["Semua", "Peringatan", "Sukses", "Info"];
const activityFilterColors: { [key: string]: { border: string, bg: string, text: string } } = {
  "Semua": { border: "#E2E8F0", bg: "#FFFFFF", text: "#64748B" },
  "Peringatan": { border: "#F97316", bg: "#FFF7ED", text: "#F97316" },
  "Sukses": { border: "#22C55E", bg: "#F0FDF4", text: "#22C55E" },
  "Info": { border: "#64748B", bg: "#F8F9FA", text: "#64748B" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "10px 14px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "6px", fontWeight: 600 }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: p.color,
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1E293B" }}>
              {p.value}
              {p.name === "suhu" ? "°C" : "%"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsScreen() {
  const [activeFilter, setActiveFilter] = useState("Hari Ini");
  const [activeActivityFilter, setActiveActivityFilter] = useState("Semua");
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showSuhu, setShowSuhu] = useState(true);
  const [showKelembaban, setShowKelembaban] = useState(true);

  const handleFilterClick = (filter: string) => {
    if (filter === "Lainnya") {
      setDateModalOpen(true);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleApplyDateRange = () => {
    console.log("Date range applied:", { startDate, endDate });
    setActiveFilter(`Dari ${startDate} ke ${endDate}`);
    setDateModalOpen(false);
  };

  const filteredActivityLog = activityLog.filter(item => {
    if (activeActivityFilter === "Semua") return true;
    if (activeActivityFilter === "Peringatan") return item.type === "warning";
    if (activeActivityFilter === "Sukses") return item.type === "success";
    if (activeActivityFilter === "Info") return item.type === "info";
    return false;
  });

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
        <span style={{ fontSize: "20px", fontWeight: 700, color: "#1E293B" }}>Riwayat Data</span>
      </div>

      <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Filter Chips */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: activeFilter === f ? "none" : "1.5px solid #E2E8F0",
                background: activeFilter === f ? "#3B82F6" : "#FFFFFF",
                color: activeFilter === f ? "white" : "#64748B",
                fontSize: "13px",
                fontWeight: activeFilter === f ? 700 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s",
                boxShadow: activeFilter === f ? "0px 4px 10px rgba(59,130,246,0.3)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Chart Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "18px 16px 12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B" }}>Grafik Sensor</span>
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
                onClick={() => setShowSuhu(!showSuhu)}
              >
                <span
                  style={{
                    width: "10px",
                    height: "3px",
                    background: showSuhu ? "#F97316" : "#E2E8F0",
                    borderRadius: "2px",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 500 }}>Suhu</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
                onClick={() => setShowKelembaban(!showKelembaban)}
              >
                <span
                  style={{
                    width: "10px",
                    height: "3px",
                    background: showKelembaban ? "#3B82F6" : "#E2E8F0",
                    borderRadius: "2px",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 500 }}>Kelembaban</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSuhu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorKelembaban" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "'Inter', sans-serif" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "'Inter', sans-serif" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {showSuhu && (
                <Area
                  type="monotone"
                  dataKey="suhu"
                  name="suhu"
                  stroke="#F97316"
                  strokeWidth={2.5}
                  fill="url(#colorSuhu)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2 }}
                />
              )}
              {showKelembaban && (
                <Area
                  type="monotone"
                  dataKey="kelembaban"
                  name="kelembaban"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fill="url(#colorKelembaban)"
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {[
            { label: "Rata-rata Suhu", value: "26.1°C", color: "#F97316" },
            { label: "Rata-rata RH", value: "64.3%", color: "#3B82F6" },
            { label: "Total Aktivasi", value: "12x", color: "#22C55E" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#FFFFFF",
                borderRadius: "12px",
                padding: "12px 10px",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.04)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "18px", fontWeight: 800, color: stat.color, marginBottom: "2px" }}>{stat.value}</p>
              <p style={{ fontSize: "10px", color: "#94A3B8", fontWeight: 400, lineHeight: "1.3" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B" }}>
              Aktivitas Terakhir
            </p>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
              {activityFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveActivityFilter(f)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "16px",
                    border: `1.5px solid ${activeActivityFilter === f ? activityFilterColors[f].border : '#E2E8F0'}`,
                    background: activeActivityFilter === f ? activityFilterColors[f].bg : '#FFFFFF',
                    color: activeActivityFilter === f ? activityFilterColors[f].text : '#64748B',
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredActivityLog.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "14px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      background: item.iconBg,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={item.iconColor} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "3px" }}>
                      {item.time}
                    </p>
                    <p style={{ fontSize: "13px", fontWeight: 400, color: "#475569", lineHeight: "1.4" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Date Range Modal */}
      {isDateModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: 'calc(100% - 40px)',
            maxWidth: '340px',
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1E293B' }}>Pilih Rentang Tanggal</h3>
              <button onClick={() => setDateModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={20} color="#64748B" />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#475569', display: 'block', marginBottom: '6px' }}>Tanggal Mulai</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  fontFamily: "'Inter', sans-serif",
                }}/>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#475569', display: 'block', marginBottom: '6px' }}>Tanggal Selesai</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  fontFamily: "'Inter', sans-serif",
                }}/>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setDateModalOpen(false)} style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0',
                background: '#FFFFFF',
                color: '#475569',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                Batal
              </button>
              <button onClick={handleApplyDateRange} style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: '#3B82F6',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB - Download */}
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
        <Download size={22} color="white" strokeWidth={2} />
      </button>

      <BottomNav />
    </div>
  );
}