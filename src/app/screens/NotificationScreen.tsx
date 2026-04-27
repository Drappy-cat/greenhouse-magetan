import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Trash2,
  ThermometerSun,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Info,
  BellOff,
} from "lucide-react";

type NotifType = "warning" | "success" | "error" | "info";

interface Notif {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ElementType;
}

const initialNotifications: Notif[] = [
  {
    id: 1,
    type: "warning",
    title: "Suhu Melebihi Batas",
    message: "Suhu ruangan mencapai 32°C, melebihi batas optimal 30°C. Kipas sirkulasi diaktifkan otomatis.",
    time: "14:05",
    read: false,
    icon: ThermometerSun,
  },
  {
    id: 2,
    type: "warning",
    title: "Kelembaban Rendah",
    message: "Kelembaban turun ke 52%, di bawah batas minimal 55%. Sistem irigasi mikro diaktifkan.",
    time: "11:30",
    read: false,
    icon: Droplets,
  },
  {
    id: 3,
    type: "success",
    title: "Sistem Otomasi Aktif",
    message: "Semua aktuator berjalan normal. Kondisi greenhouse optimal untuk pertumbuhan tanaman.",
    time: "08:00",
    read: true,
    icon: CheckCircle2,
  },
  {
    id: 4,
    type: "error",
    title: "Sensor CO₂ Offline",
    message: "Sensor karbon dioksida tidak merespons selama 5 menit. Periksa koneksi perangkat.",
    time: "Kemarin 22:15",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: 5,
    type: "success",
    title: "Jadwal Penyiraman Selesai",
    message: "Penyiraman zona A & B berhasil dilakukan sesuai jadwal pukul 06:00 WIB.",
    time: "Kemarin 06:02",
    read: true,
    icon: Wind,
  },
  {
    id: 6,
    type: "info",
    title: "Pembaruan Sistem",
    message: "Firmware perangkat IoT berhasil diperbarui ke v2.4.1. Restart otomatis selesai.",
    time: "2 hari lalu",
    read: true,
    icon: Info,
  },
];

const typeStyles: Record<NotifType, { bg: string; iconBg: string; iconColor: string; border: string }> = {
  warning: { bg: "#FFFBEB", iconBg: "#FEF3C7", iconColor: "#D97706", border: "#FDE68A" },
  success: { bg: "#F0FDF4", iconBg: "#DCFCE7", iconColor: "#16A34A", border: "#BBF7D0" },
  error:   { bg: "#FFF1F2", iconBg: "#FFE4E6", iconColor: "#E11D48", border: "#FECDD3" },
  info:    { bg: "#EFF6FF", iconBg: "#DBEAFE", iconColor: "#2563EB", border: "#BFDBFE" },
};

export function NotificationScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notif[]>(initialNotifications);
  const [showConfirm, setShowConfirm] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const deleteOne = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    setShowConfirm(false);
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Group: Hari Ini vs Sebelumnya
  const today = notifications.filter(
    (n) => !n.time.includes("Kemarin") && !n.time.includes("hari lalu")
  );
  const earlier = notifications.filter(
    (n) => n.time.includes("Kemarin") || n.time.includes("hari lalu")
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "32px",
        position: "relative",
      }}
    >
      {/* ── Top App Bar ── */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "52px 16px 14px",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Back + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "#F1F5F9",
                border: "none",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={18} color="#1E293B" strokeWidth={2} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#1E293B" }}>
                Notifikasi
              </span>
              {unreadCount > 0 && (
                <span
                  style={{
                    background: "#EF4444",
                    color: "white",
                    borderRadius: "20px",
                    padding: "2px 8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  background: "#EFF6FF",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2563EB",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Tandai Dibaca
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                style={{
                  background: "#FFF1F2",
                  border: "none",
                  borderRadius: "10px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title="Bersihkan semua riwayat"
              >
                <Trash2 size={16} color="#E11D48" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "16px" }}>
        {notifications.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "100px",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#F1F5F9",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BellOff size={36} color="#CBD5E1" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#1E293B" }}>
              Tidak Ada Notifikasi
            </p>
            <p style={{ fontSize: "13px", color: "#94A3B8", textAlign: "center", maxWidth: "220px", lineHeight: 1.5 }}>
              Semua riwayat notifikasi telah dihapus. Sistem akan mengirim pesan saat ada kejadian baru.
            </p>
            <button
              onClick={() => navigate(-1)}
              style={{
                marginTop: "8px",
                background: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Kembali ke Beranda
            </button>
          </motion.div>
        ) : (
          <>
            {/* Group: Hari Ini */}
            {today.length > 0 && (
              <NotifGroup label="Hari Ini" items={today} onDelete={deleteOne} onRead={markRead} />
            )}
            {/* Group: Sebelumnya */}
            {earlier.length > 0 && (
              <NotifGroup label="Sebelumnya" items={earlier} onDelete={deleteOne} onRead={markRead} />
            )}
          </>
        )}
      </div>

      {/* ── Confirm Dialog Overlay ── */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "28px 24px",
                width: "calc(100% - 48px)",
                maxWidth: "360px",
                boxShadow: "0px 20px 50px rgba(0,0,0,0.2)",
                textAlign: "center",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#FFF1F2",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Trash2 size={28} color="#E11D48" strokeWidth={1.8} />
              </div>
              <p style={{ fontSize: "17px", fontWeight: 700, color: "#1E293B", marginBottom: "8px" }}>
                Bersihkan Semua?
              </p>
              <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6, marginBottom: "24px" }}>
                Seluruh riwayat notifikasi akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setShowConfirm(false)}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1.5px solid #E2E8F0",
                    background: "#F8F9FA",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#64748B",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={clearAll}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #E11D48, #F43F5E)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "white",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: "0px 4px 14px rgba(225,29,72,0.35)",
                  }}
                >
                  Hapus Semua
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Subcomponent: Group ── */
function NotifGroup({
  label,
  items,
  onDelete,
  onRead,
}: {
  label: string;
  items: Notif[];
  onDelete: (id: number) => void;
  onRead: (id: number) => void;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#94A3B8",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: "10px",
          paddingLeft: "4px",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <AnimatePresence initial={false}>
          {items.map((notif) => (
            <NotifCard key={notif.id} notif={notif} onDelete={onDelete} onRead={onRead} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Subcomponent: Card ── */
function NotifCard({
  notif,
  onDelete,
  onRead,
}: {
  notif: Notif;
  onDelete: (id: number) => void;
  onRead: (id: number) => void;
}) {
  const style = typeStyles[notif.type];
  const Icon = notif.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
      onClick={() => onRead(notif.id)}
      style={{
        background: notif.read ? "#FFFFFF" : style.bg,
        borderRadius: "16px",
        padding: "14px",
        boxShadow: notif.read
          ? "0px 2px 8px rgba(0,0,0,0.04)"
          : "0px 3px 12px rgba(0,0,0,0.07)",
        border: notif.read ? "1px solid #F1F5F9" : `1px solid ${style.border}`,
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
      }}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span
          style={{
            position: "absolute",
            top: "14px",
            right: "48px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#3B82F6",
            border: "2px solid white",
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "14px",
          background: style.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={style.iconColor} strokeWidth={2} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: notif.read ? 600 : 700,
              color: "#1E293B",
              lineHeight: 1.3,
              paddingRight: "8px",
            }}
          >
            {notif.title}
          </p>
          <span
            style={{
              fontSize: "10px",
              color: "#94A3B8",
              whiteSpace: "nowrap",
              fontWeight: 500,
              marginTop: "1px",
            }}
          >
            {notif.time}
          </span>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#64748B",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {notif.message}
        </p>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notif.id);
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#CBD5E1",
          transition: "color 0.15s, background 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#EF4444";
          e.currentTarget.style.background = "#FFF1F2";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#CBD5E1";
          e.currentTarget.style.background = "none";
        }}
        title="Hapus notifikasi ini"
      >
        <Trash2 size={14} strokeWidth={2} />
      </button>
    </motion.div>
  );
}
