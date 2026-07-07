"use client";

import { useEffect, useState } from "react";
import SmokeyCursor from "@/components/lightswind/smokey-cursor"

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.innerWidth > 768);
  }, []);

  if (!enabled) return null;

  return <SmokeyCursor />;
}