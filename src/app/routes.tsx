import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { ScheduleScreen } from "./screens/ScheduleScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { NotificationScreen } from "./screens/NotificationScreen";

export const router = createBrowserRouter([
  { path: "/",                Component: SplashScreen },
  { path: "/login",           Component: LoginScreen },
  { path: "/register",        Component: RegisterScreen },
  { path: "/forgot-password", Component: ForgotPasswordScreen },
  { path: "/dashboard",       Component: DashboardScreen },
  { path: "/analytics",       Component: AnalyticsScreen },
  { path: "/schedule",        Component: ScheduleScreen },
  { path: "/settings",        Component: SettingsScreen },
  { path: "/notifications",   Component: NotificationScreen },
]);