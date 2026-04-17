import { useNavigate, useLocation } from "react-router";
import { Home, BarChart2, Clock, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "Beranda", path: "/dashboard" },
  { icon: BarChart2, label: "Riwayat", path: "/analytics" },
  { icon: Clock, label: "Jadwal", path: "/schedule" },
  { icon: Settings, label: "Pengaturan", path: "/settings" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        background: "#FFFFFF",
        borderTop: "1px solid #F1F5F9",
        boxShadow: "0px -2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0 16px",
        zIndex: 100,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 16px",
              color: isActive ? "#3B82F6" : "#94A3B8",
              transition: "color 0.2s ease",
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
