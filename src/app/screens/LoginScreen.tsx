import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, QrCode, KeyRound, RefreshCw, CheckCircle2, Smartphone, Wifi, ShieldCheck, Moon, Sun } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

type LoginTab = "password" | "qrcode";
type QrStatus = "waiting" | "scanning" | "scanned" | "success";

/* ── Generate random session token for QR ── */
const genToken = () =>
  `gh-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

const QR_EXPIRE_SEC = 60;

export function LoginScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<LoginTab>("password");

  /* ── Password form state ── */
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px 36px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          color: "#475569",
          zIndex: 10,
        }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      {/* ── TOP SECTION: Logo & Branding ── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "64px",
          paddingBottom: "24px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "26px",
            background: "linear-gradient(140deg, #16A34A 0%, #22C55E 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
            boxShadow: "0px 10px 28px rgba(34, 197, 94, 0.35)",
          }}
        >
          <svg width="46" height="46" viewBox="0 0 52 52" fill="none">
            <rect x="6" y="22" width="40" height="26" rx="3" fill="white" fillOpacity="0.25" />
            <path d="M4 22L26 6L48 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="12" y="30" width="10" height="12" rx="2" fill="white" fillOpacity="0.5" />
            <rect x="30" y="30" width="10" height="12" rx="2" fill="white" fillOpacity="0.5" />
            <path d="M26 18 C26 18, 32 22, 32 28 C32 31, 29 33, 26 33 C23 33, 20 31, 20 28 C20 22, 26 18, 26 18Z" fill="white" fillOpacity="0.85" />
            <path d="M26 18 L26 33" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
            margin: "0 0 6px",
            textAlign: "center",
          }}
        >
          Magetan Greenhouse
        </h1>
        <span
          style={{
            display: "inline-block",
            background: "#ECFDF5",
            color: "#15803D",
            borderRadius: "20px",
            padding: "4px 14px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          Sistem Otomasi berbasis Fuzzy Logic
        </span>
      </div>

      {/* ── MIDDLE SECTION: Tab Card ── */}
      <div
        style={{
          width: "100%",
          background: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0px 4px 24px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            background: "#F1F5F9",
            margin: "20px 20px 0",
            borderRadius: "14px",
            padding: "4px",
            gap: "4px",
          }}
        >
          {(["password", "qrcode"] as LoginTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "11px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                transition: "background 0.25s, color 0.25s, box-shadow 0.25s",
                background: activeTab === tab ? "#FFFFFF" : "transparent",
                color: activeTab === tab ? "#1E293B" : "#94A3B8",
                boxShadow: activeTab === tab ? "0px 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {tab === "password" ? (
                <><KeyRound size={15} strokeWidth={2.2} /> Kata Sandi</>
              ) : (
                <><QrCode size={15} strokeWidth={2.2} /> Kode QR</>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "password" ? (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              style={{ padding: "20px 20px 24px" }}
            >
              <PasswordForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                onLogin={handleLogin}
                onForgot={() => navigate("/forgot-password")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="qrcode"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.22 }}
              style={{ padding: "20px 20px 24px" }}
            >
              <QrLoginPanel onSuccess={() => navigate("/dashboard")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── BOTTOM SECTION ── */}
      <div style={{ textAlign: "center", paddingTop: "24px" }}>
        <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "14px" }}>
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#2563EB", fontWeight: 700, fontSize: "13px",
              fontFamily: "'Inter', sans-serif", padding: 0,
            }}
          >
            Daftar Sekarang
          </button>
        </p>
        <p style={{ fontSize: "11px", color: "#CBD5E1", fontWeight: 400, lineHeight: 1.6 }}>
          © 2025 Magetan Greenhouse
        </p>
        <p style={{ fontSize: "11px", color: "#CBD5E1", fontWeight: 400 }}>
          Fuzzy Logic Automation System • v1.2.0
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Password Form
══════════════════════════════════════ */
function PasswordForm({
  email, setEmail, password, setPassword,
  showPassword, setShowPassword, loading, onLogin, onForgot,
}: {
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  loading: boolean; onLogin: () => void; onForgot: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <p style={{ fontSize: "12px", fontWeight: 700, color: "#94A3B8", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        Masuk ke Akun
      </p>

      {/* Email */}
      <div>
        <label style={labelStyle}>ID Operator / Email</label>
        <input
          type="text"
          placeholder="Masukkan ID atau email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
        />
      </div>

      {/* Password */}
      <div>
        <label style={labelStyle}>Kata Sandi</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
            style={{ ...inputStyle, paddingRight: "48px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: "4px", display: "flex", alignItems: "center" }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Forgot */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onForgot}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#2563EB", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "2px 0" }}
        >
          Lupa kata sandi?
        </button>
      </div>

      {/* Login Button */}
      <motion.button
        onClick={onLogin}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        style={{
          width: "100%", padding: "14px", borderRadius: "12px",
          background: loading ? "#94A3B8" : "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
          border: "none", cursor: loading ? "not-allowed" : "pointer",
          color: "#FFF", fontSize: "15px", fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          boxShadow: loading ? "none" : "0px 6px 18px rgba(59,130,246,0.38)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
        }}
      >
        {loading && (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{ width: "16px", height: "16px", border: "2.5px solid rgba(255,255,255,0.3)", borderTop: "2.5px solid white", borderRadius: "50%" }}
          />
        )}
        {loading ? "Memverifikasi..." : "Masuk Sistem"}
      </motion.button>
    </div>
  );
}

/* ══════════════════════════════════════
   QR Login Panel
══════════════════════════════════════ */
function QrLoginPanel({ onSuccess }: { onSuccess: () => void }) {
  const [token, setToken] = useState(genToken);
  const [status, setStatus] = useState<QrStatus>("waiting");
  const [countdown, setCountdown] = useState(QR_EXPIRE_SEC);

  const resetQr = useCallback(() => {
    setToken(genToken());
    setStatus("waiting");
    setCountdown(QR_EXPIRE_SEC);
  }, []);

  /* Countdown timer */
  useEffect(() => {
    if (status !== "waiting" && status !== "scanning") return;
    if (countdown <= 0) { resetQr(); return; }
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown, status, resetQr]);

  /* Demo: simulate scan after 5s */
  useEffect(() => {
    if (status !== "waiting") return;
    const t1 = setTimeout(() => setStatus("scanning"), 5000);
    return () => clearTimeout(t1);
  }, [token, status]);

  useEffect(() => {
    if (status !== "scanning") return;
    const t2 = setTimeout(() => setStatus("scanned"), 2500);
    return () => clearTimeout(t2);
  }, [status]);

  useEffect(() => {
    if (status !== "scanned") return;
    const t3 = setTimeout(() => { setStatus("success"); }, 800);
    return () => clearTimeout(t3);
  }, [status]);

  useEffect(() => {
    if (status !== "success") return;
    const t4 = setTimeout(onSuccess, 1800);
    return () => clearTimeout(t4);
  }, [status, onSuccess]);

  const qrValue = `https://greenhouse.magetan.ac.id/auth?token=${token}`;
  const expiredPct = (countdown / QR_EXPIRE_SEC) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      {/* How-to instruction */}
      <div
        style={{
          width: "100%", background: "#EFF6FF", border: "1px solid #BFDBFE",
          borderRadius: "14px", padding: "12px 14px", display: "flex", gap: "10px", alignItems: "flex-start",
          boxSizing: "border-box",
        }}
      >
        <Smartphone size={18} color="#2563EB" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} />
        <div>
          <p style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: 700, color: "#1E40AF" }}>
            Cara login dengan QR Code
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "#3B82F6", lineHeight: 1.6 }}>
            Buka aplikasi Greenhouse di HP Anda → Tap ikon QR → Arahkan kamera ke kode ini
          </p>
        </div>
      </div>

      {/* QR Code box */}
      <div
        style={{
          position: "relative", width: "210px", height: "210px",
          borderRadius: "20px", padding: "16px", boxSizing: "border-box",
          background: status === "success" ? "linear-gradient(135deg, #064E3B, #047857)" : "#FFFFFF",
          boxShadow: status === "scanning" || status === "scanned"
            ? "0 0 0 3px #3B82F6, 0px 8px 24px rgba(59,130,246,0.25)"
            : status === "success"
            ? "0 0 0 3px #22C55E, 0px 8px 24px rgba(34,197,94,0.3)"
            : "0px 4px 20px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.4s, background 0.4s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {/* ── Waiting / Scanning ── */}
          {(status === "waiting" || status === "scanning") && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <QRCodeSVG
                value={qrValue}
                size={178}
                bgColor="#FFFFFF"
                fgColor="#0F172A"
                level="M"
                imageSettings={{
                  src: "",
                  x: undefined,
                  y: undefined,
                  height: 0,
                  width: 0,
                  excavate: false,
                }}
              />

              {/* Corner brackets */}
              {["tl", "tr", "bl", "br"].map((corner) => (
                <div
                  key={corner}
                  style={{
                    position: "absolute",
                    width: "22px", height: "22px",
                    borderColor: status === "scanning" ? "#3B82F6" : "#22C55E",
                    borderStyle: "solid",
                    borderWidth: "3px",
                    top: corner.startsWith("t") ? 0 : "auto",
                    bottom: corner.startsWith("b") ? 0 : "auto",
                    left: corner.endsWith("l") ? 0 : "auto",
                    right: corner.endsWith("r") ? 0 : "auto",
                    borderTopWidth: corner.startsWith("t") ? "3px" : "0",
                    borderBottomWidth: corner.startsWith("b") ? "3px" : "0",
                    borderLeftWidth: corner.endsWith("l") ? "3px" : "0",
                    borderRightWidth: corner.endsWith("r") ? "3px" : "0",
                    borderTopLeftRadius: corner === "tl" ? "6px" : "0",
                    borderTopRightRadius: corner === "tr" ? "6px" : "0",
                    borderBottomLeftRadius: corner === "bl" ? "6px" : "0",
                    borderBottomRightRadius: corner === "br" ? "6px" : "0",
                    transition: "border-color 0.3s",
                  }}
                />
              ))}

              {/* Scan line animation */}
              {status === "scanning" && (
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    left: "4px", right: "4px",
                    height: "2.5px",
                    background: "linear-gradient(90deg, transparent, #3B82F6, transparent)",
                    borderRadius: "2px",
                    boxShadow: "0 0 8px rgba(59,130,246,0.8)",
                  }}
                />
              )}
            </motion.div>
          )}

          {/* ── Scanned ── */}
          {status === "scanned" && (
            <motion.div
              key="scanned"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
                style={{
                  width: "64px", height: "64px", borderRadius: "20px",
                  background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Smartphone size={34} color="#2563EB" strokeWidth={1.8} />
              </motion.div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1E293B", textAlign: "center" }}>
                Konfirmasi di HP Anda
              </p>
            </motion.div>
          )}

          {/* ── Success ── */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
            >
              {/* Pulse ring */}
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{
                    position: "absolute", width: "80px", height: "80px",
                    borderRadius: "50%", border: "2px solid #34D399",
                  }}
                />
                <div
                  style={{
                    width: "64px", height: "64px", borderRadius: "20px",
                    background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <CheckCircle2 size={36} color="#34D399" strokeWidth={2} />
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 800, color: "#FFFFFF", textAlign: "center" }}>
                Berhasil!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex", alignItems: "center", gap: "7px",
            padding: "8px 16px", borderRadius: "20px",
            background: statusBg[status],
            border: `1px solid ${statusBorder[status]}`,
          }}
        >
          <motion.div
            animate={status === "waiting" ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: statusDot[status],
            }}
          />
          <span style={{ fontSize: "12px", fontWeight: 700, color: statusText[status] }}>
            {statusLabel[status]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Expiry countdown bar — only when waiting */}
      {(status === "waiting" || status === "scanning") && (
        <div style={{ width: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 500 }}>
              QR kedaluwarsa dalam
            </span>
            <span style={{
              fontSize: "11px", fontWeight: 700,
              color: countdown <= 15 ? "#EF4444" : "#64748B",
            }}>
              0:{String(countdown).padStart(2, "0")}
            </span>
          </div>
          <div style={{ height: "4px", background: "#E2E8F0", borderRadius: "4px", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${expiredPct}%` }}
              transition={{ duration: 0.8 }}
              style={{
                height: "100%", borderRadius: "4px",
                background: countdown <= 15 ? "#EF4444" : countdown <= 30 ? "#F97316" : "#22C55E",
                transition: "background 0.5s",
              }}
            />
          </div>
        </div>
      )}

      {/* Security & Refresh row */}
      {(status === "waiting" || status === "scanning") && (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ShieldCheck size={13} color="#22C55E" strokeWidth={2.5} />
            <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 500 }}>Enkripsi end-to-end</span>
            <Wifi size={11} color="#94A3B8" strokeWidth={2} />
          </div>
          <button
            onClick={resetQr}
            style={{
              background: "none", border: "1px solid #E2E8F0",
              borderRadius: "10px", padding: "6px 10px",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
              color: "#64748B", fontSize: "11px", fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <RefreshCw size={11} strokeWidth={2.5} />
            Perbarui QR
          </button>
        </div>
      )}

      {/* Demo notice */}
      <div
        style={{
          width: "100%", background: "#FFFBEB", border: "1px solid #FDE68A",
          borderRadius: "12px", padding: "10px 14px", boxSizing: "border-box",
        }}
      >
        <p style={{ margin: 0, fontSize: "11px", color: "#92400E", lineHeight: 1.6 }}>
          ⚡ <strong>Demo:</strong> Simulasi scan otomatis dimulai dalam 5 detik. Dalam implementasi nyata, scan menggunakan kamera HP.
        </p>
      </div>
    </div>
  );
}

/* ── Status display maps ── */
const statusBg: Record<QrStatus, string> = {
  waiting: "#F0FDF4", scanning: "#EFF6FF", scanned: "#EFF6FF", success: "#F0FDF4",
};
const statusBorder: Record<QrStatus, string> = {
  waiting: "#BBF7D0", scanning: "#BFDBFE", scanned: "#BFDBFE", success: "#BBF7D0",
};
const statusDot: Record<QrStatus, string> = {
  waiting: "#22C55E", scanning: "#3B82F6", scanned: "#3B82F6", success: "#22C55E",
};
const statusText: Record<QrStatus, string> = {
  waiting: "#15803D", scanning: "#1D4ED8", scanned: "#1D4ED8", success: "#15803D",
};
const statusLabel: Record<QrStatus, string> = {
  waiting: "Menunggu scan...",
  scanning: "Memindai QR Code...",
  scanned: "QR terdeteksi — konfirmasi di HP",
  success: "Login berhasil!",
};

/* ── Shared styles ── */
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "12px", fontWeight: 600,
  color: "#64748B", marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: "12px",
  border: "1.5px solid #E2E8F0", background: "#F8FAFC",
  fontSize: "14px", color: "#1E293B", outline: "none",
  fontFamily: "'Inter', sans-serif", boxSizing: "border-box",
  transition: "border-color 0.2s",
};
