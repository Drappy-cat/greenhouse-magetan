import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

type Step = "email" | "otp" | "newpass" | "success";

const TOTAL_STEPS = 3; // email, otp, newpass (success is final)

const stepIndex: Record<Step, number> = { email: 1, otp: 2, newpass: 3, success: 4 };

const passwordStrength = (pw: string) => {
  if (!pw) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Lemah", color: "#EF4444" };
  if (score === 2) return { level: 2, label: "Cukup", color: "#F97316" };
  if (score === 3) return { level: 3, label: "Kuat", color: "#EAB308" };
  return { level: 4, label: "Sangat Kuat", color: "#22C55E" };
};

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward, -1 = backward

  const goTo = (s: Step, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setTimeout(() => setStep(s), 20);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      {step !== "success" && (
        <div
          style={{
            background: "linear-gradient(155deg, #1E3A5F 0%, #1D4ED8 60%, #3B82F6 100%)",
            padding: "52px 20px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Deco circles */}
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: "-30px", left: "-40px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

          {/* Back */}
          <button
            onClick={() => {
              if (step === "email") navigate("/login");
              else if (step === "otp") goTo("email", -1);
              else if (step === "newpass") goTo("otp", -1);
            }}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "12px",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginBottom: "20px",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowLeft size={18} color="white" strokeWidth={2.2} />
          </button>

          {/* Step indicators */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
            {[1, 2, 3].map((s) => {
              const cur = stepIndex[step];
              const active = s === cur;
              const done = s < cur;
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <motion.div
                    animate={{
                      width: active ? "28px" : "8px",
                      background: done ? "#34D399" : active ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ height: "8px", borderRadius: "4px" }}
                  />
                </div>
              );
            })}
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginLeft: "4px", fontWeight: 500 }}>
              {Math.min(stepIndex[step], TOTAL_STEPS)}/{TOTAL_STEPS}
            </span>
          </div>

          {/* Title area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <StepHeader step={step} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Body ── */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, overflowY: "auto" }}
          >
            {step === "email" && <EmailStep onNext={() => goTo("otp")} />}
            {step === "otp"   && <OtpStep   onNext={() => goTo("newpass")} />}
            {step === "newpass" && <NewPassStep onNext={() => goTo("success")} />}
            {step === "success" && <SuccessStep onLogin={() => navigate("/login")} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Slide animation variants ── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0 }),
};

/* ════════════════════════════════════
   Step Header
════════════════════════════════════ */
function StepHeader({ step }: { step: Step }) {
  const map: Record<Step, { icon: React.ReactNode; title: string; desc: string }> = {
    email: {
      icon: <Mail size={26} color="white" strokeWidth={1.8} />,
      title: "Lupa Kata Sandi?",
      desc: "Masukkan email terdaftar Anda. Kami akan mengirim kode verifikasi.",
    },
    otp: {
      icon: <ShieldCheck size={26} color="white" strokeWidth={1.8} />,
      title: "Verifikasi Kode OTP",
      desc: "Masukkan 6 digit kode yang dikirim ke email Anda.",
    },
    newpass: {
      icon: <Lock size={26} color="white" strokeWidth={1.8} />,
      title: "Buat Sandi Baru",
      desc: "Pastikan sandi baru Anda kuat dan mudah diingat.",
    },
    success: { icon: null, title: "", desc: "" },
  };
  const { icon, title, desc } = map[step];
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.12)",
          border: "1.5px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          backdropFilter: "blur(8px)",
        }}
      >
        {icon}
      </div>
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "0 0 5px", letterSpacing: "-0.4px" }}>
          {title}
        </h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   Step 1 — Email
════════════════════════════════════ */
function EmailStep({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email.trim()) { setError("Email wajib diisi"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Format email tidak valid"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1400);
  };

  return (
    <div style={bodyStyle}>
      {/* Info card */}
      <div
        style={{
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "14px",
          padding: "14px 16px",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "#DBEAFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Mail size={18} color="#2563EB" strokeWidth={2} />
        </div>
        <div>
          <p style={{ margin: "0 0 3px", fontSize: "13px", fontWeight: 700, color: "#1E40AF" }}>
            Cek kotak masuk email Anda
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#3B82F6", lineHeight: 1.5 }}>
            Kode OTP berlaku selama <strong>10 menit</strong>. Periksa folder spam jika tidak muncul.
          </p>
        </div>
      </div>

      {/* Email input */}
      <div>
        <label style={labelStyle}>Alamat Email</label>
        <div style={{ position: "relative" }}>
          <div style={prefixIconStyle}>
            <Mail size={16} color="#94A3B8" />
          </div>
          <input
            type="email"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            style={{ ...inputStyle(!!error), paddingLeft: "44px" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#3B82F6"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#EF4444" : "#E2E8F0"; }}
          />
        </div>
        <AnimatePresence>
          {error && <ErrorMsg msg={error} />}
        </AnimatePresence>
      </div>

      {/* Submit */}
      <PrimaryButton
        label={loading ? "Mengirim kode..." : "Kirim Kode OTP"}
        onClick={handleSend}
        loading={loading}
        color="#2563EB"
        shadow="rgba(37,99,235,0.35)"
      />

      <p style={{ textAlign: "center", fontSize: "13px", color: "#64748B" }}>
        Ingat kata sandi?{" "}
        <a href="/login" style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none" }}>
          Kembali Login
        </a>
      </p>
    </div>
  );
}

/* ════════════════════════════════════
   Step 2 — OTP
════════════════════════════════════ */
const OTP_LENGTH = 6;

function OtpStep({ onNext }: { onNext: () => void }) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(59);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  /* Countdown */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  const handleChange = (val: string, idx: number) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    setError("");
    if (digit && idx < OTP_LENGTH - 1) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otp];
    pasted.split("").forEach((d, i) => { next[i] = d; });
    setOtp(next);
    refs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) { setError("Masukkan semua 6 digit kode OTP"); return; }
    if (code !== "123456") { setError("Kode OTP tidak valid. Silakan coba lagi."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1200);
  };

  const handleResend = () => {
    setResendCooldown(59);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    refs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;

  return (
    <div style={bodyStyle}>
      {/* Demo hint */}
      <div
        style={{
          background: "#F0FDF4",
          border: "1px solid #BBF7D0",
          borderRadius: "14px",
          padding: "12px 16px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <KeyRound size={16} color="#16A34A" strokeWidth={2} />
        <p style={{ margin: 0, fontSize: "12px", color: "#15803D", lineHeight: 1.5 }}>
          Demo: gunakan kode <strong style={{ letterSpacing: "2px" }}>1 2 3 4 5 6</strong> untuk melanjutkan.
        </p>
      </div>

      {/* OTP Boxes */}
      <div>
        <label style={labelStyle}>Kode OTP (6 digit)</label>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "4px",
          }}
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{
                width: "46px",
                height: "56px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: 800,
                color: "#1E293B",
                borderRadius: "14px",
                border: `2px solid ${
                  error ? "#EF4444" : digit ? "#3B82F6" : "#E2E8F0"
                }`,
                background: digit ? "#EFF6FF" : "#F8FAFC",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                transition: "border-color 0.2s, background 0.2s",
                caretColor: "transparent",
                boxSizing: "border-box",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.background = "#EFF6FF"; }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = error ? "#EF4444" : digit ? "#3B82F6" : "#E2E8F0";
                e.currentTarget.style.background = digit ? "#EFF6FF" : "#F8FAFC";
              }}
            />
          ))}
        </div>

        {/* Progress under boxes */}
        <div
          style={{
            marginTop: "12px",
            height: "3px",
            background: "#E2E8F0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ width: `${(filled / OTP_LENGTH) * 100}%` }}
            transition={{ duration: 0.2 }}
            style={{
              height: "100%",
              background: filled === OTP_LENGTH ? "#22C55E" : "#3B82F6",
              borderRadius: "4px",
            }}
          />
        </div>
        <p style={{ fontSize: "12px", color: "#94A3B8", textAlign: "center", marginTop: "6px" }}>
          {filled}/{OTP_LENGTH} digit terisi
        </p>

        <AnimatePresence>
          {error && <ErrorMsg msg={error} center />}
        </AnimatePresence>
      </div>

      {/* Verify button */}
      <PrimaryButton
        label={loading ? "Memverifikasi..." : "Verifikasi Kode"}
        onClick={handleVerify}
        loading={loading}
        color="#2563EB"
        shadow="rgba(37,99,235,0.35)"
      />

      {/* Resend */}
      <div style={{ textAlign: "center" }}>
        {resendCooldown > 0 ? (
          <p style={{ fontSize: "13px", color: "#94A3B8" }}>
            Kirim ulang kode dalam{" "}
            <span style={{ color: "#2563EB", fontWeight: 700 }}>
              0:{String(resendCooldown).padStart(2, "0")}
            </span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#2563EB",
              fontWeight: 700,
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <RefreshCw size={14} strokeWidth={2.5} />
            Kirim ulang kode OTP
          </button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   Step 3 — New Password
════════════════════════════════════ */
function NewPassStep({ onNext }: { onNext: () => void }) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ newPass?: string; confirmPass?: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pwStr = passwordStrength(newPass);

  const handleSave = () => {
    setSubmitted(true);
    const e: typeof errors = {};
    if (!newPass) e.newPass = "Sandi baru wajib diisi";
    else if (newPass.length < 8) e.newPass = "Minimal 8 karakter";
    else if (pwStr.level < 2) e.newPass = "Sandi terlalu lemah";
    if (!confirmPass) e.confirmPass = "Konfirmasi sandi wajib diisi";
    else if (newPass !== confirmPass) e.confirmPass = "Sandi tidak cocok";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1300);
  };

  const requirements = [
    { label: "Minimal 8 karakter", ok: newPass.length >= 8 },
    { label: "Mengandung huruf kapital", ok: /[A-Z]/.test(newPass) },
    { label: "Mengandung angka", ok: /[0-9]/.test(newPass) },
    { label: "Mengandung simbol (!@#...)", ok: /[^A-Za-z0-9]/.test(newPass) },
  ];

  return (
    <div style={bodyStyle}>
      {/* New password */}
      <div>
        <label style={labelStyle}>Sandi Baru</label>
        <div style={{ position: "relative" }}>
          <div style={prefixIconStyle}><Lock size={16} color="#94A3B8" /></div>
          <input
            type={showNew ? "text" : "password"}
            placeholder="Buat sandi baru"
            value={newPass}
            onChange={(e) => { setNewPass(e.target.value); if (submitted) setErrors((er) => ({ ...er, newPass: undefined })); }}
            style={{ ...inputStyle(submitted && !!errors.newPass), paddingLeft: "44px", paddingRight: "44px" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#3B82F6"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = submitted && errors.newPass ? "#EF4444" : "#E2E8F0"; }}
          />
          <button type="button" onClick={() => setShowNew(!showNew)} style={eyeBtn}>
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Strength bar */}
        {newPass.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "5px" }}>
              {[1, 2, 3, 4].map((l) => (
                <div
                  key={l}
                  style={{
                    flex: 1, height: "5px", borderRadius: "4px",
                    background: l <= pwStr.level ? pwStr.color : "#E2E8F0",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: pwStr.color }}>
              Keamanan: {pwStr.label}
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {submitted && errors.newPass && <ErrorMsg msg={errors.newPass} />}
        </AnimatePresence>
      </div>

      {/* Requirements checklist */}
      <div
        style={{
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: "14px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.6px" }}>
          Persyaratan sandi
        </p>
        {requirements.map((req) => (
          <motion.div
            key={req.label}
            animate={{ color: req.ok ? "#16A34A" : "#94A3B8" }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <motion.div animate={{ scale: req.ok ? 1 : 0.8, opacity: req.ok ? 1 : 0.5 }}>
              <CheckCircle2 size={14} color={req.ok ? "#22C55E" : "#CBD5E1"} strokeWidth={2.5} />
            </motion.div>
            <span style={{ fontSize: "12px", fontWeight: 500, color: req.ok ? "#16A34A" : "#94A3B8", transition: "color 0.2s" }}>
              {req.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Confirm password */}
      <div>
        <label style={labelStyle}>Konfirmasi Sandi Baru</label>
        <div style={{ position: "relative" }}>
          <div style={prefixIconStyle}><Lock size={16} color="#94A3B8" /></div>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Ulangi sandi baru"
            value={confirmPass}
            onChange={(e) => { setConfirmPass(e.target.value); if (submitted) setErrors((er) => ({ ...er, confirmPass: undefined })); }}
            style={{ ...inputStyle(submitted && !!errors.confirmPass), paddingLeft: "44px", paddingRight: "44px" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#3B82F6"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = submitted && errors.confirmPass ? "#EF4444" : "#E2E8F0"; }}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={eyeBtn}>
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Match indicator */}
        {confirmPass.length > 0 && newPass.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "6px" }}>
            {newPass === confirmPass ? (
              <><CheckCircle2 size={13} color="#22C55E" strokeWidth={2.5} /><span style={{ fontSize: "11px", color: "#22C55E", fontWeight: 600 }}>Sandi cocok</span></>
            ) : (
              <><AlertCircle size={13} color="#EF4444" strokeWidth={2.5} /><span style={{ fontSize: "11px", color: "#EF4444", fontWeight: 600 }}>Sandi tidak cocok</span></>
            )}
          </motion.div>
        )}

        <AnimatePresence>
          {submitted && errors.confirmPass && <ErrorMsg msg={errors.confirmPass} />}
        </AnimatePresence>
      </div>

      <PrimaryButton
        label={loading ? "Menyimpan..." : "Simpan Sandi Baru"}
        onClick={handleSave}
        loading={loading}
        color="#2563EB"
        shadow="rgba(37,99,235,0.35)"
      />
    </div>
  );
}

/* ════════════════════════════════════
   Step 4 — Success
════════════════════════════════════ */
function SuccessStep({ onLogin }: { onLogin: () => void }) {
  useEffect(() => {
    const t = setTimeout(onLogin, 4000);
    return () => clearTimeout(t);
  }, [onLogin]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(155deg, #064E3B 0%, #065F46 50%, #047857 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        padding: "32px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Deco */}
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

      {/* Floating sparkles */}
      {[
        { top: "15%", left: "10%", size: 6, delay: 0 },
        { top: "20%", left: "85%", size: 5, delay: 0.4 },
        { top: "70%", left: "8%",  size: 7, delay: 0.8 },
        { top: "75%", left: "80%", size: 5, delay: 0.2 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0, 0.7, 0], y: [0, -30], scale: [0, 1, 0] }}
          transition={{ duration: 2.5, delay: s.delay, repeat: Infinity, repeatDelay: 1 }}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
          }}
        />
      ))}

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
        style={{
          width: "110px",
          height: "110px",
          borderRadius: "36px",
          background: "rgba(255,255,255,0.12)",
          border: "2px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(12px)",
          marginBottom: "32px",
          boxShadow: "0px 0px 60px rgba(52,211,153,0.35), 0px 8px 32px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            inset: "-14px",
            borderRadius: "48px",
            border: "2px solid rgba(52,211,153,0.4)",
          }}
        />
        <ShieldCheck size={52} color="#34D399" strokeWidth={1.8} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.6px" }}>
          Sandi Berhasil<br />Diperbarui!
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>
          Kata sandi akun Anda telah berhasil diubah.<br />
          Gunakan sandi baru untuk masuk ke sistem.
        </p>
      </motion.div>

      {/* Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "18px",
          padding: "18px 20px",
          width: "100%",
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backdropFilter: "blur(8px)",
          marginBottom: "32px",
          boxSizing: "border-box",
        }}
      >
        {[
          "Sandi baru telah disimpan",
          "Sesi lama telah diakhiri",
          "Notifikasi keamanan terkirim",
        ].map((text, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "8px",
                background: "rgba(52,211,153,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={13} color="#34D399" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
              {text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Countdown redirect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", width: "100%", maxWidth: "320px" }}
      >
        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxSizing: "border-box",
          }}
        >
          Masuk Sekarang
        </button>

        <CountdownBar duration={4} />
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
          Otomatis diarahkan ke halaman login...
        </p>
      </motion.div>
    </div>
  );
}

/* ── Countdown bar ── */
function CountdownBar({ duration }: { duration: number }) {
  return (
    <div style={{ width: "100%", maxWidth: "200px", height: "3px", background: "rgba(255,255,255,0.15)", borderRadius: "4px", overflow: "hidden" }}>
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration, ease: "linear" }}
        style={{ height: "100%", background: "#34D399", borderRadius: "4px" }}
      />
    </div>
  );
}

/* ════════════════════════════════════
   Shared sub-components
════════════════════════════════════ */

function PrimaryButton({
  label,
  onClick,
  loading,
  color,
  shadow,
}: {
  label: string;
  onClick: () => void;
  loading: boolean;
  color: string;
  shadow: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileTap={{ scale: 0.97 }}
      style={{
        width: "100%",
        padding: "15px",
        borderRadius: "14px",
        background: loading
          ? "#94A3B8"
          : `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        color: "#FFFFFF",
        fontSize: "15px",
        fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.3px",
        boxShadow: loading ? "none" : `0px 6px 20px ${shadow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          style={{
            width: "18px",
            height: "18px",
            border: "2.5px solid rgba(255,255,255,0.3)",
            borderTop: "2.5px solid white",
            borderRadius: "50%",
          }}
        />
      )}
      {label}
    </motion.button>
  );
}

function ErrorMsg({ msg, center }: { msg: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginTop: "6px",
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      <AlertCircle size={13} color="#EF4444" strokeWidth={2.5} />
      <p style={{ margin: 0, fontSize: "12px", color: "#EF4444", fontWeight: 500 }}>{msg}</p>
    </motion.div>
  );
}

/* ════════════════════════════════════
   Shared styles
════════════════════════════════════ */
const bodyStyle: React.CSSProperties = {
  padding: "24px 16px 40px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748B",
  marginBottom: "6px",
};

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  border: `1.5px solid ${hasError ? "#EF4444" : "#E2E8F0"}`,
  background: "#F8FAFC",
  fontSize: "14px",
  color: "#1E293B",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
});

const prefixIconStyle: React.CSSProperties = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
};

const eyeBtn: React.CSSProperties = {
  position: "absolute",
  right: "13px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#94A3B8",
  padding: "4px",
  display: "flex",
  alignItems: "center",
};
