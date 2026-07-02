import { keyframes, type Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

export const reducedMotionQuery = "@media (prefers-reduced-motion: reduce)";

export const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const softScaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const healthPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(21, 101, 192, 0.2);
    transform: scale(1);
  }
  45% {
    box-shadow: 0 0 0 10px rgba(21, 101, 192, 0);
    transform: scale(1.04);
  }
`;

export const ecgTrace = keyframes`
  from {
    stroke-dashoffset: 120;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

export function entranceSx(
  delayMs = 0,
  durationMs = 420,
): SystemStyleObject<Theme> {
  return {
    animation: `${fadeSlideUp} ${durationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
    animationDelay: `${delayMs}ms`,
    [reducedMotionQuery]: {
      animation: "none",
    },
  };
}

export function scaleEntranceSx(delayMs = 0): SystemStyleObject<Theme> {
  return {
    animation: `${softScaleIn} 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
    animationDelay: `${delayMs}ms`,
    [reducedMotionQuery]: {
      animation: "none",
    },
  };
}

export const hoverLiftSx: SystemStyleObject<Theme> = {
  transition:
    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease",
  [reducedMotionQuery]: {
    transition: "none",
  },
  "&:hover": {
    borderColor: "rgba(21, 101, 192, 0.22)",
    boxShadow: "0 16px 34px rgba(13, 71, 161, 0.12)",
    transform: "translateY(-2px)",
  },
};
