"use client";

import { PulseLoader } from "react-spinners";

export default function ComponentLevelLoader({
  text,
  color,
  loading,
  size,
  styles,
}) {
  return (
    <span className={`flex gap-1 ${styles}`}>
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid="loader"
      />
    </span>
  );
}
