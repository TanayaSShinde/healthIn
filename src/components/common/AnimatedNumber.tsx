import { useEffect, useMemo, useState } from "react";

type AnimatedNumberProps = {
  durationMs?: number;
  format?: (value: number) => string;
  value: number;
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function AnimatedNumber({
  durationMs = 900,
  format = (value) => Math.round(value).toLocaleString("en-IN"),
  value,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const updateValue = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      setDisplayValue(value * easeOutCubic(progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateValue);
      }
    };

    frameId = requestAnimationFrame(updateValue);

    return () => cancelAnimationFrame(frameId);
  }, [durationMs, prefersReducedMotion, value]);

  return <>{format(displayValue)}</>;
}

