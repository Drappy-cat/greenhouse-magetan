# Technical Specification: GreenHouse Magetan - IoT Climate Control Dashboard

## Executive Summary
This document outlines the architecture and requirements for GreenHouse Magetan, an advanced IoT dashboard application for real-time agricultural climate monitoring and control. The solution includes a dynamic frontend for farmers to monitor temperature and humidity, adjust setpoints, and visualize AI-driven Fuzzy Logic decisions that automatically control actuators (fans and heaters).

## Requirements

### Functional Requirements
- **Real-Time Monitoring:** Continuous monitoring of temperature (°C) and humidity (%) with real-time updates.
- **Fuzzy Logic AI Engine:** Transparent AI inference that calculates the optimal state for cooling (Fans) and heating (Heaters) based on current temperature deviations from the user's setpoint.
- **Setpoint Control:** Interactive UI allowing users to easily increment or decrement target temperature setpoints.
- **Actuator Status:** Visual indicators showing the real-time ON/OFF status of circulation fans and heaters.
- **Notification System:** Alerts for extreme climate conditions or system updates.

### Non-Functional Requirements
- **Performance:** Smooth interval-based data updates and reactive UI interactions without blocking the main thread.
- **Aesthetics:** Highly premium, dynamic UI featuring soft gradients, glassmorphism elements, Lucide icons, and smooth micro-animations for an engaging user experience.
- **Responsiveness:** Mobile-first layout with bottom navigation, optimized for farmers using mobile devices.

## Architecture & Tech Stack

- **Frontend (Dashboard Application):** 
  - **Framework:** React.js built with Vite and TypeScript for rapid development, optimized bundling, and type safety.
  - **Styling:** Inline CSS and custom styling tailored for a premium aesthetic, utilizing modern design trends without the overhead of heavy frameworks.
  - **Icons:** `lucide-react` for clean, consistent iconography.
  - **Routing:** `react-router` for seamless navigation.
- **Backend & IoT Integration (Conceptual):**
  - **Data Source:** Simulated real-time data intervals mapped to physical sensor hardware behaviors.
  - **Control Logic:** Client-side rule-based fuzzy logic implementation.

## State Management

- **Client-Side (Local State):** React `useState` and `useEffect` hooks manage rapidly updating sensor data, user setpoints, and actuator states.
- **Derived State:** AI confidence, temperature status (PANAS, DINGIN, NORMAL), and active rules are derived directly from the difference between the current temperature and the user setpoint.
