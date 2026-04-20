import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { router } from "./routes";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div
      style={{
        minHeight: "100vh",
        background: "#E5E7EB",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Mobile Frame Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "100vh",
          position: "relative",
          background: "#F8F9FA",
          boxShadow: "0px 0px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <RouterProvider router={router} />
      </div>
    </div>
    </ThemeProvider>
  );
}
