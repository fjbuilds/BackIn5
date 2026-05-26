import React from "react";

interface IconProps {
  size?: number;
  stroke?: number;
  className?: string;
}

const Icon = ({
  children,
  size = 20,
  stroke = 1.75,
  className,
}: IconProps & { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>
);
export const IconPhoneMissed = (p: IconProps) => (
  <Icon {...p}><line x1="22" y1="2" x2="16" y2="8" /><line x1="16" y1="2" x2="22" y2="8" /><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>
);
export const IconMessage = (p: IconProps) => (
  <Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Icon>
);
export const IconCheck = (p: IconProps) => (
  <Icon {...p}><polyline points="20 6 9 17 4 12" /></Icon>
);
export const IconX = (p: IconProps) => (
  <Icon {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>
);
export const IconMinus = (p: IconProps) => (
  <Icon {...p}><line x1="5" y1="12" x2="19" y2="12" /></Icon>
);
export const IconArrowRight = (p: IconProps) => (
  <Icon {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
);
export const IconCalendar = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>
);
export const IconClock = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>
);
export const IconInbox = (p: IconProps) => (
  <Icon {...p}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></Icon>
);
export const IconCheckCircle = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 10" /></Icon>
);
export const IconShield = (p: IconProps) => (
  <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>
);
export const IconStar = (p: IconProps) => (
  <Icon {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>
);
export const IconBell = (p: IconProps) => (
  <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></Icon>
);
export const IconPlus = (p: IconProps) => (
  <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>
);
export const IconWrench = (p: IconProps) => (
  <Icon {...p}><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4l-6.6 6.6a1.41 1.41 0 0 0 0 2l1 1a1.41 1.41 0 0 0 2 0l6.6-6.6a4 4 0 0 1 5.4-5.4l-2 2 1.4 1.4 2-2a4 4 0 0 1-4 4z" /></Icon>
);
export const IconBoltAlt = (p: IconProps) => (
  <Icon {...p}><path d="M13 2 4.5 13h6L11 22l8.5-11h-6L13 2z" /></Icon>
);
export const IconHome = (p: IconProps) => (
  <Icon {...p}><path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" /></Icon>
);
export const IconLeaf = (p: IconProps) => (
  <Icon {...p}><path d="M11 20A7 7 0 0 1 4 13c0-6 8-10 16-10 0 8-4 17-9 17z" /><path d="M2 22c5-5 8-8 18-12" /></Icon>
);
export const IconBrick = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><line x1="12" y1="4" x2="12" y2="10" /><line x1="8" y1="14" x2="8" y2="20" /><line x1="16" y1="14" x2="16" y2="20" /></Icon>
);
export const IconQuestion = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12" y2="17.01" /></Icon>
);
export const IconRefresh = (p: IconProps) => (
  <Icon {...p}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" /><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" /></Icon>
);
export const IconChat = (p: IconProps) => (
  <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>
);
export const IconMail = (p: IconProps) => (
  <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 6 12 13 2 6" /></Icon>
);
export const IconBoiler = (p: IconProps) => (
  <Icon {...p}><rect x="6" y="3" width="12" height="18" rx="2" /><line x1="6" y1="9" x2="18" y2="9" /><line x1="10" y1="6" x2="10" y2="6.01" /><line x1="14" y1="6" x2="14" y2="6.01" /><circle cx="12" cy="15" r="2" /></Icon>
);
export const IconBug = (p: IconProps) => (
  <Icon {...p}><rect x="8" y="6" width="8" height="14" rx="4" /><path d="M19 7l-3 2" /><path d="M5 7l3 2" /><path d="M19 13h-3" /><path d="M8 13H5" /><path d="M19 19l-3-2" /><path d="M5 19l3-2" /><path d="M12 6V3" /></Icon>
);
export const IconKey = (p: IconProps) => (
  <Icon {...p}><circle cx="7.5" cy="15.5" r="4.5" /><line x1="10.5" y1="12.5" x2="21" y2="2" /><line x1="18" y1="5" x2="20" y2="7" /><line x1="15" y1="8" x2="17" y2="10" /></Icon>
);
export const IconSpray = (p: IconProps) => (
  <Icon {...p}><path d="M8 2h6v6H8z" /><path d="M6 8h10v14H6z" /><line x1="9" y1="13" x2="13" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /><line x1="14" y1="4" x2="19" y2="4" /><line x1="14" y1="6" x2="19" y2="6" /></Icon>
);
export const IconDoor = (p: IconProps) => (
  <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="14" y1="14" x2="14" y2="14.01" /></Icon>
);
export const IconBrush = (p: IconProps) => (
  <Icon {...p}><path d="M9.06 11.9 4.5 16.5a2.83 2.83 0 0 0 4 4l4.6-4.5" /><path d="m21 3-9.5 9.5-3-3L18 0" /></Icon>
);
