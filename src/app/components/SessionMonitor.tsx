"use client";

import { useSessionMonitor } from "@/app/lib/useSessionMonitor";

interface SessionMonitorProps {
  children?: React.ReactNode;
  checkInterval?: number;
}

/**
 * Component wrapper that monitors session validity
 * Add this to your layout to automatically logout users when refresh token fails
 */
export default function SessionMonitor({ children, checkInterval }: SessionMonitorProps) {
  useSessionMonitor(checkInterval);
  
  return <>{children}</>;
}
