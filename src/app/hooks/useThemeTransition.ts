import { useTheme } from "next-themes";
import React from "react";

export function useThemeTransition() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (e?: React.MouseEvent | any) => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    const updateDOM = () => {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
      setTheme(nextTheme);
    };

    // Fallback if browser doesn't support View Transitions
    if (!document.startViewTransition) {
      updateDOM();
      return;
    }

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateDOM();
    });

    transition.ready.then(() => {
      try {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      } catch (err) {
        console.error("View transition animation error:", err);
      }
    });
  };

  return { theme, toggleTheme };
}
